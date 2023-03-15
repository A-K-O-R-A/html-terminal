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

  lineBuffer: string[];

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
    this.lineBuffer = [""];

    // Hook to autofocus input
    window.onclick = (e) => {
      // Check if mouse is below input element
      if (
        e.clientX > this.cursorElm.offsetLeft &&
        e.clientY > this.cursorElm.offsetTop
      ) {
        this.cursorElm.focus();
      }
    };

    window.onresize = (_) => {
      this.update();
    };
  }

  private computedStyle() {
    return window.getComputedStyle(this.codeElm);
  }

  // Rearange terminal
  private update() {
    this.updateCodeElement();
    this.setCursor(...this.cursorPos);
  }

  private updateCodeElement() {
    let bufferLen = this.lineBuffer.length;
    let [_, rowCount] = this.getDimensions();

    let displayAbleContent: string[];

    if (bufferLen > rowCount) {
      displayAbleContent = this.lineBuffer.slice(
        bufferLen - rowCount,
        bufferLen + rowCount
      );

      let [x, _] = this.cursorPos;
      this.setCursor(x, rowCount - 1);
    } else {
      displayAbleContent = this.lineBuffer;
    }

    this.codeElm.innerHTML = displayAbleContent.join("\n");
  }

  print(txt: string) {
    let lines = txt.split("\n");
    let firstLine = lines.shift();

    this.lineBuffer[this.lineBuffer.length - 1] += firstLine;
    this.lineBuffer.push(...lines);

    this.updateCodeElement();
  }

  println(txt: string) {
    this.print(txt + "\n");
  }

  clear() {
    this.lineBuffer = [""];
    this.cursorPos = [0, 0];
    this.update();
  }

  setCursor(x: number, y: number) {
    this.cursorPos = [x, y];

    // Pixels that dont add up to a full line
    //let topOffset =
    //  (window.innerHeight - 2 * this.marginSize) % this.lineHeight;

    let top = this.marginSize + y * this.lineHeight; // + (this.lineHeight - topOffset);
    let left = this.marginSize + x * characterPixelSize;

    this.cursorElm.style.top = `${top}px`;
    this.cursorElm.style.left = `${left}px`;
    this.cursorElm.style.width = `calc(100vw - ${left}px)`;
  }

  // Returns [columnCount, rowCount]
  getDimensions(): [number, number] {
    let cols = (window.innerWidth - 2 * this.marginSize) / characterPixelSize;
    cols = Math.floor(cols);
    let rows = (window.innerHeight - 2 * this.marginSize) / this.lineHeight;
    rows = Math.floor(rows);

    return [cols, rows];
  }
}
