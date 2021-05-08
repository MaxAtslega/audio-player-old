import React from "react";
import { Input as InputStyle, Label } from "./Input.styles";

export default function Input(props: any) {
  return (
    <React.Fragment>
      {props.label ? <Label>{props.label}</Label> : null}
      <InputStyle {...props} />
    </React.Fragment>
  );
}
