import React from "react";
import { Select as SelectStyle, Label } from "./Select.styles";

export default function Select({
  options,
  label,
  bgSecondary,
  onChange,
  selected,
}: {
  bgSecondary: boolean;
  label: string;
  selected: string;
  onChange: any;
  options: string[];
}) {
  return (
    <React.Fragment>
      {label ? <Label>{label}</Label> : null}
      <SelectStyle
        value={selected}
        onChange={onChange}
        bgSecondary={bgSecondary}
      >
        <option disabled value="selected-default">
          -- select an option --
        </option>
        {options.map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </SelectStyle>
    </React.Fragment>
  );
}
