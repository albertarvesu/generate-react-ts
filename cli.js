#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs-extra');
const replace = require('replace-in-file');

let compName;

const tmplPath = path.resolve(__dirname, './tmpl');

const program = require('commander')
  .version(require('./package.json').version)
  .arguments('<component-directory>')
  .action(function (name) {
    compName = name;
  })
  .option('-p, --pure', 'Create pure component')
  .parse(process.argv);
  
function generateComponent(name) {
  const root = path.resolve(name);
  const RE_COMP_DIR = RegExp('\/(containers|components|generate-react-ts)$','i');

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  if (!RE_COMP_DIR.test(__dirname)) {
    console.error('Please make sure you are inside the containers or components directory.');
    return;
  }

  const componentFile = path.join(root, `${name}.tsx`);
  const componentTestFile = path.join(root, `${name}.test.tsx`);
  const componentIndexFile = path.join(root, `index.ts`);

  program.pres
    ? fs.copySync(`${tmplPath}/component.functional.tmpl`, componentFile)
    : fs.copySync(`${tmplPath}/component.tmpl`, componentFile);

  fs.copySync(`${tmplPath}/component.test.tmpl`, componentTestFile);
  fs.copySync(`${tmplPath}/component.index.tmpl`, componentIndexFile);

  const options = {
    files: [
      componentFile,
      componentTestFile,
      componentIndexFile,
    ],
    from: /\{Comp\}/g,
    to: name,
  };

  try {
    const changes = replace.sync(options);
    console.log('Created the following files:\n', changes.join('\n'));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}

generateComponent(compName);
