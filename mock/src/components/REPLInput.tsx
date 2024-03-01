import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { searchMap, jsonMap } from "../mock_data/mocked";
import { tupleList } from "./REPLHistory";
import {
  ICommand,
  LoadCSVCommand,
  ViewCSVCommand,
  SearchCSVCommand,
  ChangeModeCommand,
} from "./Commands";

let globalCSV: string[][] | null = null;
type historyArray = tupleList[];

interface REPLInputProps {
  history: historyArray;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<historyArray>>;
}

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
