import { Command, allCommands } from ".";

import * as platform from "platform";

// Timestamp with the time this code was loaded
const loadTime = new Date();

const meFetchCommand: Command = {
  command: "neofetch",
  description: "Shows information about this environment",
  usage: "neofetch",
  execute(shell, _argv) {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const d = new Date(new Date().getTime() - loadTime.getTime());
    let mins = d.getMinutes();
    let secs = d.getSeconds();

    let mem = Math.floor(Math.random() * 16309);

    shell.println(
      `
teal(                                ..,)   teal(Unknown)@teal(${platform.name})
teal(                    ....,,:;+ccllll)   --------------------------
teal(      ...,,+:;  cllllllllllllllllll)   teal(OS:) ${platform.name}
teal(,cclllllllllll  lllllllllllllllllll)   teal(Host:) ${platform.os}
teal(llllllllllllll  lllllllllllllllllll)   teal(Kernel:) ${platform.version}
teal(llllllllllllll  lllllllllllllllllll)   teal(Uptime:) ${mins} min, ${secs} s
teal(llllllllllllll  lllllllllllllllllll)   teal(Packages:) ${allCommands.length} (scoop)
teal(llllllllllllll  lllllllllllllllllll)   teal(Shell:) wish 4.2.0
teal(llllllllllllll  lllllllllllllllllll)   teal(Resolution:) ${width}x${height}
teal(                                   )   teal(DE:) Aero
teal(llllllllllllll  lllllllllllllllllll)   teal(WM:) Tabulator
teal(llllllllllllll  lllllllllllllllllll)   teal(WM Theme:) Custom
teal(llllllllllllll  lllllllllllllllllll)   teal(Terminal:) --
teal(llllllllllllll  lllllllllllllllllll)   teal(Memory:) ${mem}MiB / 16309MiB
teal(llllllllllllll  lllllllllllllllllll)
teal(\`'ccllllllllll  lllllllllllllllllll)
teal(        \`' \*::  :ccllllllllllllllll)
teal(                       \`\`\`\`''*::cll)   
teal(                                 \`\`)
    `.format()
    );
  },
};

export default meFetchCommand;
