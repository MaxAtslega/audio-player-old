import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 20px;

  h1 {
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 730px) {
    margin-bottom: 20px;
  }
`;

export const Line = styled.div`
  width: 100%;
  border: 2px solid var(--background-secondary);
`;
