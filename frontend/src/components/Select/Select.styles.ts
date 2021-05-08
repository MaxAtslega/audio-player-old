import styled from "styled-components";

export interface Props {
  bgSecondary?: boolean;
}
export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const Select = styled.select<Props>`
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
