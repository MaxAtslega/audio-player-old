import styled from "styled-components";

export interface Props {
  bgSecondary?: false;
}

export interface PropsButton {
  background?: string;
  color?: string;
}

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.input<Props>`
  outline: 0;
  background: var(
    ${(props: Props) =>
      props.bgSecondary ? "--background-secondary" : "--background-primary"}
  );
  width: 100%;
  border: 0;
  margin: 8px 0 20px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--text-primary);
`;

export const Button = styled.input<PropsButton>`
  text-transform: uppercase;
  outline: 0;
  background: ${(props: PropsButton) =>
    props.background ? props.background : "#d77600"};
  color: ${(props: PropsButton) =>
    props.color ? props.color : "var(--text-primary)"};
  width: 200px;
  border: 0;
  padding: 15px;

  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;

  @media only screen and (max-width: 730px) {
    width: 100%;
    margin-right: 0;
  }

  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
`;
