import "./style.css";
import "./lib/colors";
import { Terminal } from "./lib/terminal";

var terminal = new Terminal("#terminal", "#cursor");

terminal.clear();
terminal.initShell();

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
