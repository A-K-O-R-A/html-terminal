import "./style.css";
import { Terminal } from "./terminal";

const log = window.console.log;

var terminal = new Terminal("#terminal");

terminal.clear();
let code = await (
  await fetch(
    "https://raw.githubusercontent.com/A-K-O-R-A/boop-rs/main/cli/src/main.rs"
  )
).text();
terminal.addText(code);

log("A");
