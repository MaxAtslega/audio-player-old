import styled from "styled-components";
import {GiSoundWaves} from "react-icons/gi";

export const Category = styled.ul`
  list-style: none;
  margin-top: 30px;
  padding: 0;
`;

export const Controllers = styled.div`
  display: flex;
  justify-content: left;
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


`

export const CategoryItem = styled.li`
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: var(--background-secondary);
  font-size: 16px;
  text-align: center;
  text-decoration: underline;
`
export const AudioItem = styled.li`
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
    border-bottom: #4CD137 solid 3px;
  }

  @media only screen and (max-width: 730px) {
    justify-content: center;
  }


  &:hover {
    opacity: .8 !important;
  }
`;
