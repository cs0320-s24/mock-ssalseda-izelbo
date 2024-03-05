import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { historyArray } from "./REPLHistory";

/**
 * A component that renders a REPL interface.
 * 
 * This component displays a history of commands and their outputs, and allows the user to enter new commands.
 * 
 * @returns A React element that represents a REPL interface.
 */

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<historyArray>([]);
  const [mode, setMode] = useState<string>("brief");

  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} /> {/* Pass mode state */}
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
