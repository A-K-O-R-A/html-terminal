import "./style.css";
import "./lib/format";
import { Terminal } from "./lib/terminal";
import { Shell } from "./lib/shell";

let lineBuffer = JSON.parse(localStorage.getItem("lineBuffer")!);
let scrollOffset = JSON.parse(localStorage.getItem("scrollOffset")!);
let cursorPos = JSON.parse(localStorage.getItem("cursorPos")!);

let firstSession = !localStorage.getItem("lineBuffer");

var terminal = new Terminal("#terminal", "#cursor");
var shell = new Shell(terminal);

if (firstSession) {
  shell.prepareNewCommand();

  terminal.cursorElm.value = "neofetch";
  shell.executeCommand();
  shell.prepareNewCommand();
} else {
  terminal.lineBuffer = lineBuffer!;
  terminal.scrollOffset = scrollOffset!;
  terminal.cursorPos = cursorPos!;

  terminal.setCursor(...terminal.cursorPos);
}
/*
let code = await (
  await fetch(
    "https://raw.githubusercontent.com/A-K-O-R-A/boop-rs/main/cli/src/main.rs"
  )
).text();
terminal.print(code.teal());
*/
