import { Command } from ".";

const cdCommand: Command = {
  command: "cd",
  description: "Changes the directory",
  usage: "cd [path]",
  execute(shell, argv) {
    let path = shell.path;

    let change = argv[1].split("/").filter((p) => p !== ".");
    if (change[0] === "~" || change[0] === "/") {
      shell.path = ["~", ...change.slice(1)];
    } else {
      path.push(...change);
      while (path.indexOf("..") !== -1) {
        let i = path.indexOf("..");
        path = [...path.slice(0, i - 1), ...path.slice(i + 1)];
      }

      if (path.length === 0) {
        path = ["~"];
      }

      shell.path = path;
    }
  },
};

export default cdCommand;
