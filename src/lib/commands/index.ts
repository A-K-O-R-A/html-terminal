import { Shell } from "../shell";
import cdCommand from "./cd";
import clsCommand from "./clear";
import helpCommand from "./help";
import meFetchCommand from "./neofetch";

export interface Command {
  command: string;
  description: string;
  usage: string;
  execute(shell: Shell, argv: string[]): void;
}

export const allCommands: Command[] = [
  cdCommand,
  clsCommand,
  meFetchCommand,
  helpCommand,
];
