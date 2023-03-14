import "./style.css";

class Terminal {
  element: HTMLElement;

  constructor(elmentId: string) {
    this.element = document.querySelector(elmentId)!;
  }

  addText(txt: string) {
    this.element.innerText += txt;
  }

  clear() {
    this.element.innerText = "";
  }
}

var terminal = new Terminal("#terminal");
