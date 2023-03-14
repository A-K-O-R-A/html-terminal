// This class manages all the logic behind the terminal emulation
export class Terminal {
  codeElm: HTMLElement;
  // The element for typing input
  cursorElm: HTMLInputElement;

  constructor(codeElementSelector: string, cursorElementSelector: string) {
    this.codeElm = document.querySelector(codeElementSelector)!;
    this.cursorElm = document.querySelector(cursorElementSelector)!;
  }

  computedStyle() {
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

  shell() {
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
    this.print(" ❯".green());
  }
}
