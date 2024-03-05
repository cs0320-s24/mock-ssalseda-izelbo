import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

interface ControlledInputProps {
  value: string;

  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}


/**
 * A component designed for entering commands.
 * @param props The properties required to configure the ControlledInput component
 * @returns A React element representing a text input field configured as described by the properties.
 */

export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
