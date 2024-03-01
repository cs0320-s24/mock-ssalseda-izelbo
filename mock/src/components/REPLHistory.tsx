import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

//using a tuple so that we can easily accept a string or an array of strings + command and no command for mode
export type tupleList = [string, string[][] | string];
export type historyArray = tupleList[];

interface REPLHistoryProps {
  //using a tuple so that we can easily accept a string or an array of strings + command and no command for mode
  history: historyArray;
  // setHistory: Dispatch<SetStateAction<historyArray>>;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
