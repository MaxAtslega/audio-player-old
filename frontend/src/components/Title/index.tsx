import * as React from "react";
import { Container, Line } from "./Title.styles";

export default function Title({ title }: { title: string }) {
  return (
    <Container>
      <h1>{title}</h1>
      <Line />
    </Container>
  );
}
