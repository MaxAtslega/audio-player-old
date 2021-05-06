import styled, { keyframes } from "styled-components";

export const Container = styled.div`

  padding-top: 40vh;
  display: flex;
  justify-content: center;
`;

export const loading = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }

  100% {
    transform: translate(0, 0);
  }
`;

export const Line = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin-right: 10px;
  background-color: #4b9cdb;

  &:nth-last-child(1) {
    animation: ${loading} 0.6s 0.1s linear infinite;
  }
  &:nth-last-child(2) {
    animation: ${loading} 0.6s 0.2s linear infinite;
  }
  &:nth-last-child(3) {
    animation: ${loading} 0.6s 0.3s linear infinite;
  }
`;
