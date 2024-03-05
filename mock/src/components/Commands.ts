import { searchMap, jsonMap } from "../mock_data/mocked";
import { Dispatch, SetStateAction, useState } from "react";

let globalCSV: string[][] | null = null;


/**
 * Interface for command objects that execute actions related to CSV operations.
 */

export interface ICommand {

  /**
   * Executes the command with given arguments.
   * @param args The arguments for the command execution.
   * @param commandString The full command string for commands that require it.
   * @returns A message with the outcome of the execution or the data resulted from the command.
   */
  execute(args: Array<string>, commandString: string): string | string[][];
}

/**
 * Command to load a CSV file into the global variable.
 */

export class LoadCSVCommand implements ICommand {

  /**
   * Loads a CSV file specified by the filename argument into a global variable.
   * @param args An array containing the filename of the CSV to load.
   * @returns A string message saying whether the file was successfully loaded or not found.
   */

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

/**
 * Command to view the currently loaded CSV data.
 */

export class ViewCSVCommand implements ICommand {

  /**
   * Returns the currently loaded CSV data.
   * @param args An empty array -  no arguments are expected for this command.
   * @returns The loaded CSV data as a string[][] if available, or a message prompting to load a CSV file first.
   */

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

/**
 * Command to search within the currently loaded CSV data.
 */

export class SearchCSVCommand implements ICommand {

  /**
   * Searches for a  value within a specified column of the loaded CSV data.
   * @param args An array with the value to search for and the column to search in.
   * @param commandString The full command string, used to get the mock search result.
   * @returns The search results as a string[][] if available, or a message saying no results / no loaded file.
   */

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

/**
 * Command to change the current mode of operation between "brief" and "verbose".
 */

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

  /**
   * Toggles the current mode between "brief" and "verbose".
   * @param args An empty array - no arguments are expected for this command.
   * @returns A string message with the new mode after the toggle.
   */

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



