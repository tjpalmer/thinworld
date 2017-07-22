import {React, render} from './index';

function init() {
  console.log('Hi!');
  let name = 'world';
  let clazz = 'that<>""';
  console.log(<Hi name={name}><Hello>Inside!</Hello> More</Hi>);
  console.log();
  let hi = new Hello();
  hi.hi();
  render(
    <div class={clazz}>Hi, {name}!</div>,
    document.getElementById('root')!
  );
}

type Props = {
  age?: number;
}

class Hello {
  hi = () => console.log('Hi from', this);
  props: Props & {
    name?: string;
  };
  render() {
    console.log('render!');
  }
}

class Hi extends Hello {
  props: Hello['props'] & {
    color?: string;
  };
}

// const styles = {
//   title: {
//     color: '#ff4400',
//     fontSize: 48,
//     fontWeight: 'bold',
//   }
// };

window.addEventListener('load', init);
