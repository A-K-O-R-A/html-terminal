import { Command } from ".";

const meFetchCommand: Command = {
  command: "mefetch",
  description: "Shows information about me",
  usage: "mefetch",
  execute(shell, argv) {
    shell.println(`
    a
    b
    c
    `);
  },
};

export default meFetchCommand;
