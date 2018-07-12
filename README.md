# generate-react-ts

An opinionated CLI generator for ReactJS components using Typescript for static typing and Enzyme for testing inspired by https://github.com/jonexiu/generate-react-component

This CLI should speed up the creation of React component including the test file using primarily using enzyme. It also include the option to create either class or pure component.

Class Component:

```javascript
import * as React from 'react';

interface ComponentProps {

}

interface ComponentState {

}

export class Component extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {

  }

  componentDidMount() {

  }

  public render() {
    return (
      <div></div>
    );
  }
}

export default Component;
```

Pure Component:

```javascript
import * as React from 'react';

interface ComponentProps {

}

export const Component = ({ }: ComponentProps) => (
  <div></div>
);
```

Test file

```javascript
import * as React from 'react';
import { shallow } from 'enzyme';

import { Component } from './Component';

it('renders the <Component /> without crashing', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper.type()).not.toBeNull();
});
```

## Installation

Run

```yarn add -D generate-react-ts```

or

```npm --save-dev generate-react-ts```


##Usage

### Generate Class Component

Run

```grts <ComponentName>```

By default this will create React class component with Typescript syntax.

<br>

### Generate Pure Function Component

Run

```grts <ComponentName> --pure```

or

```grts <ComponentName> -p```

Create pure function component with typescript syntax.
