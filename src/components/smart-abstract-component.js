import AbstractComponent from "./abstract-component.js";
import {replaceElement} from '../components/utils.js';
export default class SmartAbstracktComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const commonParent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    replaceElement(commonParent, newElement, oldElement);
    this.recoveryListeners();
  }
}
