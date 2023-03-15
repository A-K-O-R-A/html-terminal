import { Shell } from "../shell";
import clsCommand from "./clear";
import helpCommand from "./help";
import meFetchCommand from "./neofetch";

export interface Command {
  command: string;
  description: string;
  usage: string;
  execute(shell: Shell, argv: string[]): void;
}

export const allCommands: Command[] = [clsCommand, meFetchCommand, helpCommand];
