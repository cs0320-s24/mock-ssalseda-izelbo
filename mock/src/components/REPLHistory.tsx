import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

//using a tuple so that we can easily accept a string or an array of strings + command and no command for mode
export type tupleList = [string, string[][] | string];
export type historyArray = tupleList[];

interface REPLHistoryProps {
  //using a tuple so that we can easily accept a string or an array of strings + command and no command for mode
  history: historyArray;
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command, index) => (
        <div key={index}>
          {props.mode === "verbose" && <p>Command: {command[0]}</p>}
          {typeof command[1] === "string" && <p>Output: {command[1]}</p>}
          {Array.isArray(command[1]) && command[1].length > 0 && (
            <div className="history-item">
              <table>
                <tbody>
                  <p>Output:</p>
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
