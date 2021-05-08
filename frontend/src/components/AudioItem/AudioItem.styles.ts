import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 10px;
  background: var(--background-secondary);
  cursor: pointer;
  min-height: 55px;

  &.play {
    border-bottom: #4cd137 solid 3px;
  }

  @media only screen and (max-width: 730px) {
    justify-content: center;
  }

  &:hover {
    opacity: 0.8 !important;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border-radius: 10px;
  margin-left: 10px;
  background: var(--background-primary);

  &:hover {
    background: var(--interactive-hover);
  }

  @media only screen and (max-width: 730px) {
    display: none;
  }
  svg {
    pointer-events: none;
  }
`;

export const Controllers = styled.div`
  display: flex;
  justify-content: left;
`;
