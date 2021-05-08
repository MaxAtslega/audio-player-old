import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  min-width: 80%;

  margin-left: auto;
  margin-right: auto;

  padding-left: 20px;
  padding-right: 20px;

  padding-top: 20px;

  @media only screen and (max-width: 730px) {
    padding: 0;
  }
`;

export const Container = styled.div`
  @media only screen and (max-width: 730px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 80px;
  }
`;
