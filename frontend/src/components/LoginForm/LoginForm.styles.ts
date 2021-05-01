import styled from "styled-components";

export const Container = styled.div`
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
`;

export const Form = styled.div`
  position: relative;
  z-index: 1;
  background: var(--background-secondary);
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

export const Title = styled.h1`
  padding-bottom: 20px;
`;

export const Button = styled.input`
  text-transform: uppercase;
  outline: 0;
  background: #d77600;
  width: 100%;
  border: 0;
  padding: 15px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
`;
