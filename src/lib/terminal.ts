import { characterPixelSize } from "./util";

// This class manages all the logic behind the terminal emulation
export class Terminal {
  codeElm: HTMLElement;
  // The element for typing input
  cursorElm: HTMLInputElement;

  lineHeight: number;
  fontSize: number;
  marginSize: number;

  cursorPos: [number, number];

  constructor(codeElementSelector: string, cursorElementSelector: string) {
    this.codeElm = document.querySelector(codeElementSelector)!;
    this.cursorElm = document.querySelector(cursorElementSelector)!;

    // Calculate pixel Sizes for later calculations
    let style = this.computedStyle();
    this.lineHeight = parseFloat(style.lineHeight.replace("px", ""));
    this.fontSize = parseFloat(style.fontSize);
    // Assuming an equal border on all sides
    this.marginSize = parseFloat(style.margin);

    this.cursorPos = [0, 0];
  }

  private computedStyle() {
    return window.getComputedStyle(this.codeElm);
  }

  print(txt: string) {
    this.codeElm.innerHTML += txt;
  }
  println(txt: string) {
    this.codeElm.innerHTML += txt + "\n";
  }

  clear() {
    this.codeElm.innerHTML = "";
  }

  initShell() {
    this.println(
      "~".blue() +
        " on " +
        " master".purple() +
        " [?] ".red() +
        "is 📦 " +
        "v0.1.0".yellow() +
        " via 🦀 " +
        "v1.68.0".red()
    );
    this.print(" ❯ ".green());
    this.moveCursor(3, 1);
  }

  moveCursor(x: number, y: number) {
    this.cursorPos = [x, y];
    let top = this.marginSize + y * this.lineHeight;
    let left = this.marginSize + x * characterPixelSize;

    this.cursorElm.style.top = `${top}px`;
    this.cursorElm.style.left = `${left}px`;
    this.cursorElm.style.width = `calc(100vw - ${left}px)`;
  }
}
