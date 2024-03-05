import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

//using a tuple so that we can easily accept a string or an array of strings + command and no command for mode
export type tupleList = [string, string[][] | string];
export type historyArray = tupleList[];

interface REPLHistoryProps {
  history: historyArray;
  mode: string;
}


/**
 * A component that renders a history of commands and their outputs.
 * 
 * @param props The properties required to configure the REPLHistory component
 * @returns A React element that represents a history of commands and their outputs.
 */


export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command, index) => (
        <div key={index}>
          {props.mode === "verbose" && <p>Command: {command[0]}</p>}
          <p>Output: {typeof command[1] === "string" ? command[1] : null}</p>
          {Array.isArray(command[1]) && command[1].length > 0 && (
            <div className="history-item">
              <table>
                <tbody>
                  {command[1].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
