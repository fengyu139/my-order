import abToast from "./abToast.vue";
import { ref, h, render } from "vue";
class myToast {
  private instance: any;
  constructor() {}
  static text(text: string, close?: any) {
    const vNode = h(abToast, {
      show: true,
      text,
      close: close,
    });
    console.log(vNode);

    render(vNode, document.body);
  }
  public show(options: any) {
    this.instance.show(options);
  }
}
export default myToast;
