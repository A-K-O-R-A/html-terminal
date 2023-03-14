import "./style.css";
import "./colors";
import { Terminal } from "./terminal";

const log = window.console.log;

var terminal = new Terminal("#terminal", "#cursor");

terminal.clear();
terminal.shell();

/*
let code = await (
  await fetch(
    "https://raw.githubusercontent.com/A-K-O-R-A/boop-rs/main/cli/src/main.rs"
  )
).text();
terminal.print(code.teal());
*/

log(terminal.computedStyle().lineHeight);
log(terminal.computedStyle().fontSize);

// This forces the focus on the input field
// so the user can always type
/*
terminal.cursorElm.onblur = (_) => {
  setTimeout(() => {
    terminal.cursorElm.focus();
  }, 0);
};
*/
