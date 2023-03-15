import { Command, allCommands } from ".";

const helpCommand: Command = {
  command: "help",
  description: "Shows all available commands",
  usage: "help",
  execute(shell, argv) {
    if (argv.length === 1) {
      let output = "The following commands are available:\n\n";
      // Size of the longest command
      let padSize = allCommands
        .map((c) => c.command.length)
        .sort()
        .reverse()[0];

      for (let cmd of allCommands) {
        output += `    ${cmd.command.padEnd(padSize)}   light(${
          cmd.description
        })\n`;
      }
      shell.println(output.format());
    } else {
      //Command provided
      let commandName = argv[1];
      let cmd = allCommands.find((c) => c.command == commandName);

      if (!cmd) {
        shell.println(`Command "${commandName}" not found`);
        return;
      }

      let output = `bold(${cmd.command})\n`;
      output += cmd.description + "\n";
      output += `\nUsage: ${cmd.usage}`;
    }
  },
};

export default helpCommand;
