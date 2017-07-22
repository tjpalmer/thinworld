export function render(element: JSX.Element, root: Element) {
  if (element instanceof Element) {
    root.appendChild(element);
  }
}
