import { searchMap, jsonMap } from "../mock_data/mocked";
import { Dispatch, SetStateAction, useState } from "react";

let globalCSV: string[][] | null = null;

export interface ICommand {
  execute(args: Array<string>, commandString: string): string | string[][];
}

export class LoadCSVCommand implements ICommand {
  execute(args: Array<string>): string {
    if (args.length != 1) {
      return "Invalid args: load_file should have one argument (example: load_file <filename>)";
    } else {
      const path = args[0];

      const csv = jsonMap.get(path);

      if (csv) {
        globalCSV = csv;
        return `The file '${args[0]}' was successfully loaded`;
      } else {
        return `The file '${args[0]}' not found`;
      }
    }
  }
}

export class ViewCSVCommand implements ICommand {
  execute(args: Array<string>): string | string[][] {
    if (args.length > 0) {
      return "Invalid argument: view should have no arguments (example: view)";
    }
    if (globalCSV != null) {
      return globalCSV;
    } else {
      return "Load a CSV file first";
    }
  }
}

export class SearchCSVCommand implements ICommand {
  execute(args: Array<string>, commandString: string): string | string[][] {
    if (globalCSV != null) {
      if (args.length != 2) {
        return "Invalid argument: search should have two arguments (example: search <value> <column> )";
      }
      //we have a valid file and valid arguments

      const output = searchMap.get(commandString.toLowerCase());
      if (output) {
        return output;
      } else {
        return `No results for '${args[0]} ${args[1]}'`;
      }
    }

    return "Load a CSV file first";
  }
}

export class ChangeModeCommand implements ICommand {
  private setMode: Dispatch<SetStateAction<string>>;
  private getCurrentMode: () => string; 

  constructor(
    setMode: Dispatch<SetStateAction<string>>,
    getCurrentMode: () => string
  ) {
    this.setMode = setMode;
    this.getCurrentMode = getCurrentMode; 
  }

  execute(args: Array<string>): string {
    if (args.length !== 0) {
      return "Mode should have no arguments.";
    } else {
      const currentMode = this.getCurrentMode(); 
      const newMode = currentMode === "brief" ? "verbose" : "brief";
      this.setMode(newMode);
      return `Mode changed to ${newMode}`;
    }
  }
}



