import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { tupleList } from "./REPLHistory";
import {
  ICommand,
  LoadCSVCommand,
  ViewCSVCommand,
  SearchCSVCommand,
  ChangeModeCommand,
} from "./Commands";

type historyArray = tupleList[];

interface REPLInputProps {
  history: historyArray;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<historyArray>>;
}


/**
 * A component that renders an input field for entering commands.
 * 
 * @param props The properties required to configure the REPLInput component
 * @returns A React element that represents an input field for entering commands.
 */

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  const getCurrentMode = () => props.mode;

  const changeModeCommand = new ChangeModeCommand(
    props.setMode,
    getCurrentMode
  );

  const commands: { [key: string]: ICommand } = {
    load: new LoadCSVCommand(),
    view: new ViewCSVCommand(),
    search: new SearchCSVCommand(),
    mode: changeModeCommand, 
  };


  /**
   * A function that takes a command string and delegates it to the appropriate command object.
   * @param commandString The inputed command string
   * @returns Either the output of the command or an error message
   */

  function commandInput(commandString: string): string | string[][] {
    const split = commandString.split(" ");
    const commandName = split[0];
    const args = split.slice(1);
    const command = commands[commandName];

    if (command) {
      return command.execute(args, commandString);
    } else {
      return "Please enter a valid command";
    }
  }

  /**
   * A function that handles the submission of a command string on button press.
   * @param commandString The inputed command string
   */

  function handleSubmit(commandString: string) {
    console.log(commandInput(commandString));
    const split = commandString.split(" ");
    const commandList: tupleList = [split[0], commandInput(commandString)];
    commandString && setCommandString("");

    props.setHistory([...props.history, commandList]);
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>

      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
