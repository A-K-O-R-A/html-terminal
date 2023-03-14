import { Terminal } from "./terminal";

export class Shell {
  terminal: Terminal;

  constructor(terminal: Terminal) {
    this.terminal = terminal;

    //Bind events
    terminal.cursorElm.onkeydown = (e) => this.onKey(e);

    // Focus so the user can start typing
    terminal.cursorElm.focus();
  }

  // Capture all keyboard events
  onKey(e: KeyboardEvent) {
    //window.console.log(e.key);
    switch (e.key) {
      case "Enter": {
        this.executeCommand();
        return;
      }
    }
  }

  executeCommand() {
    let command = this.terminal.cursorElm.value;

    // Move to next line and print command to console
    this.println(command);

    // Clear input
    this.terminal.cursorElm.value = "";

    this.println(command);
    this.prepareNewCommand();
  }

  prepareNewCommand() {
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

    // Move cursor down appropriately
  }

  //Just for easier access
  print(s: string) {
    this.terminal.print(s);

    // Calculate length without font tags
    let textLength = s.replace(/<\/*font[^>]*>/g, "").length;

    let [x, y] = this.getCursor();
    this.setCursor(x + textLength, y);
  }

  println(s?: string) {
    this.terminal.println(s ?? "");
    let [_x, y] = this.getCursor();
    this.setCursor(0, y + 1);
  }

  getCursor(): [number, number] {
    return this.terminal.cursorPos;
  }

  setCursor(x: number, y: number) {
    return this.terminal.setCursor(x, y);
  }
}
