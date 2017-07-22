declare global {
  namespace JSX {
    interface Element {}
    interface ElementAttributesProperty {
      props: {};
    }
    interface IntrinsicElements {
      div: any;
    }
  }
}

export let React = {
  createElement(type: Function | string, props: any, ...kids: any[]) {
    console.log('createElement', type, props, kids);
    if (typeof type == 'string') {
      let element = document.createElement(type);
      for (let key in props) {
        element.setAttribute(key, props[key]);
      }
      let strings: Array<string> = [];
      let appendText = () => {
        if (strings.length) {
          element.appendChild(document.createTextNode(strings.join('')));
          strings.length = 0;
        }
      }
      for (let kid of kids) {
        if (typeof kid == 'string') {
          strings.push(kid);
        } else {
          appendText();
          element.appendChild(kid);
        }
      }
      appendText();
      return element;
    } else {
      return [type, props, kids];
    }
  }
};
