import { allCommands } from "./commands";
import { Terminal } from "./terminal";

export class Shell {
  terminal: Terminal;

  constructor(terminal: Terminal) {
    this.terminal = terminal;

    //Bind events
    terminal.cursorElm.onkeydown = (e) => this.onKey(e);
    window.onkeydown = (e) => {
      let shouldFocus = !e.ctrlKey;

      shouldFocus ||= e.ctrlKey && e.key === "v";

      if (!shouldFocus) return;

      terminal.cursorElm.focus();
    };

    // Focus so the user can start typing
    terminal.cursorElm.focus();
  }

  // Capture all keyboard events
  onKey(e: KeyboardEvent) {
    //window.console.log(e.key);
    switch (e.key) {
      case "Enter": {
        this.executeCommand();
        this.prepareNewCommand();
        return;
      }
    }
  }

  executeCommand() {
    let commandString = this.terminal.cursorElm.value;

    // Move to next line and print command to console
    this.println(commandString);

    // Clear input
    this.terminal.cursorElm.value = "";

    // Look up command
    let argv = commandString.split(" ");
    let commandName = argv[0];

    let cmd = allCommands.find((c) => c.command === commandName);
    if (!cmd) {
      this.println(`Command ${commandName.red()} not found`);
      return;
    }

    cmd.execute(this, argv);
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
  }

  //Just for easier access
  print(s: string) {
    this.terminal.print(s);
    let [x, y] = this.getCursor();

    let lines = s.split("\n");
    let lastLine = lines[lines.length - 1];
    // Calculate length without font tags
    let textLength = lastLine.replace(/<\/*font[^>]*>/g, "").length;

    y += lines.length - 1;
    this.setCursor(x + textLength, y);
  }

  println(s?: string) {
    this.terminal.println(s ?? "");

    let [_x, y] = this.getCursor();

    let lines = (s ?? "").split("\n");

    y += lines.length;

    this.setCursor(0, y);
  }

  getCursor(): [number, number] {
    return this.terminal.cursorPos;
  }

  setCursor(x: number, y: number) {
    return this.terminal.setCursor(x, y);
  }
}
