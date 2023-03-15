import "./style.css";
import "./lib/format";
import { Terminal } from "./lib/terminal";
import { Shell } from "./lib/shell";

var terminal = new Terminal("#terminal", "#cursor");

terminal.clear();

var shell = new Shell(terminal);
shell.prepareNewCommand();

terminal.cursorElm.value = "neofetch";
shell.executeCommand();
shell.prepareNewCommand();

/*
let code = await (
  await fetch(
    "https://raw.githubusercontent.com/A-K-O-R-A/boop-rs/main/cli/src/main.rs"
  )
).text();
terminal.print(code.teal());
*/

// This forces the focus on the input field
// so the user can always type
/*
terminal.cursorElm.onblur = (_) => {
  setTimeout(() => {
    terminal.cursorElm.focus();
  }, 0);
};
*/
