import {Game, React, render} from './index';

function init() {
  // console.log('Hi!');
  // let name = 'world';
  // let clazz = 'that<>""';
  // console.log(<Hi name={name}><Hello>Inside!</Hello> More</Hi>);
  // console.log();
  // let hi = new Hello();
  // hi.hi();
  render(
    <canvas id="canvas" height="500" width="500"></canvas>,
    window.document.getElementById('root')!
  );
  let game = new Game(
    window.document.getElementById('canvas') as HTMLCanvasElement
  );
  game.start();
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
