import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { searchMap, jsonMap } from "../mock_data/mocked";

let globalCSV: string[][] | null = null;


interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("");


  function commandInput(commandString: string): string | string[][] {
     const split = commandString.split(" ");
        const argument = split.slice(1);
        switch (split[0]) {
            case "load":
                return loadCSV(argument);
            case "view":
                return viewCSV(argument);
            case "search":
                return searchCSV(argument, commandString);
            case "mode":
                return changeMode(argument);
        }

        return "Please enter a valid command";

  }

   function loadCSV(args: Array<string>): string {
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

   function viewCSV(args: Array<string>): string | string[][] {

    if (args.length > 0) {
      return "Invalid argument: view should have no arguments (example: view)";
    }
      if (globalCSV != null) {
          return globalCSV;
      } else {
          return 'Load a CSV file first';
      }
    }

    function searchCSV(args: Array<string>, commandString: string): string | string[][] {
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

      return 'Load a CSV file first';
      
    }


    function changeMode(args: Array<string>): string {
      if (args.length != 1) {
        return "Mode should not have an argument.)";
      } else {
        //NEED TO IMPLEMENT WITH PROPS
        return `Mode changed to ${args[0]}`;
      }
    }


  function handleSubmit(commandString: string) {
    console.log(commandInput(commandString));


    props.setHistory([...props.history, commandString]);
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

      <button onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}
