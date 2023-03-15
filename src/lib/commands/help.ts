import { Command, allCommands } from ".";

const meFetchCommand: Command = {
  command: "help",
  description: "Shows all available commands",
  usage: "help",
  execute(shell, _argv) {
    shell.println("Uwu bold(bold) italic(italic)".format());
  },
};

export default meFetchCommand;
