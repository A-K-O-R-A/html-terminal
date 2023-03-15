import { Command } from ".";

const clsCommand: Command = {
  command: "cls",
  description: "Clears the terminal",
  usage: "cls",
  execute(shell, _argv) {
    shell.terminal.clear();
  },
};

export default clsCommand;
