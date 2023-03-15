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

  // Offset in lines
  _scrollOffset: number;
  // Saves the entire terminal history in lines
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
    this._scrollOffset = 0;

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

    window.onwheel = (e) => {
      // Prevent page scroll
      // e.preventDefault();

      let delta = e.deltaY / Math.abs(e.deltaY);

      this.scrollOffset += delta * 2;
    };

    this.cursorElm.onfocus = (_) => {
      this.scrollToCursor();
    };
  }

  get scrollOffset(): number {
    return this._scrollOffset;
  }

  set scrollOffset(n: number) {
    this._scrollOffset = Math.floor(n);

    if (n < 0) {
      this._scrollOffset = 0;
    }

    this.update();
  }

  private computedStyle() {
    return window.getComputedStyle(this.codeElm);
  }

  // Rearange terminal
  private update() {
    this.updateCodeElement();
    this.setCursor(...this.cursorPos);
  }

  setLocalStorage() {
    localStorage.setItem("lineBuffer", JSON.stringify(this.lineBuffer));
    localStorage.setItem("scrollOffset", JSON.stringify(this.scrollOffset));
    localStorage.setItem("cursorPos", JSON.stringify(this.cursorPos));
  }

  loadLocalStorage() {
    this.lineBuffer = JSON.parse(localStorage.getItem("lineBuffer") ?? "[]");
    this.scrollOffset = JSON.parse(localStorage.getItem("scrollOffset") ?? "0");
    this.cursorPos = JSON.parse(localStorage.getItem("cursorPos") ?? "[0, 0]");
  }

  private updateCodeElement() {
    let bufferLen = this.lineBuffer.length;
    let [_, rowCount] = this.getDimensions();

    let displayAbleContent: string[];

    if (bufferLen > rowCount) {
      displayAbleContent = this.lineBuffer.slice(
        this.scrollOffset,
        this.scrollOffset + rowCount
      );
      let contentRowCount = displayAbleContent.length;

      let [x, _] = this.cursorPos;
      this.setCursor(x, contentRowCount - 1);
    } else {
      displayAbleContent = this.lineBuffer;
    }

    this.codeElm.innerHTML = displayAbleContent.join("\n");

    this.setLocalStorage();
  }

  print(txt: string) {
    let lines = txt.split("\n");
    let firstLine = lines.shift();
    let [_, rowCount] = this.getDimensions();

    let notFullscreenBefore = this.lineBuffer.length < rowCount;

    this.lineBuffer[this.lineBuffer.length - 1] += firstLine;
    this.lineBuffer.push(...lines);

    if (notFullscreenBefore) {
      if (this.lineBuffer.length > rowCount) {
        //Now there is enough content to cover the entire screen
        let diff = this.lineBuffer.length - rowCount;
        this.scrollOffset += diff;
      }
    } else {
      this.scrollOffset += lines.length;
    }

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

    this.setLocalStorage();
  }

  // Scrolls to the cursor
  scrollToCursor() {
    debugger;
    let [_, rowCount] = this.getDimensions();

    // cursor at the bottom of the screen
    let atBottom = this.cursorPos[1] === rowCount - 1;

    if (atBottom) {
      this.scrollOffset = this.lineBuffer.length - rowCount;
      this.update();
    }

    this.setLocalStorage();
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
