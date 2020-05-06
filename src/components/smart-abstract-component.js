import AbstractComponent from "./abstract-component.js";
export default class SmartAbstracktComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }


  rerender() {
    const oldElement = this.getElement();
    const commonParent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    commonParent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
