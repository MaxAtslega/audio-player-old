import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  background-color: var(--background-header);
  color: var(--text-header);
  height: 60px;
  margin-bottom: 40px;

`;
export const TitleContainer = styled.div`
  display: inline-block;

  padding-left: 20px;
  padding-right: 20px;
  font-size: 25px;
  height: 60px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 25px;
  font-weight: bold;
`

export const Space = styled.div`
  height: 100%;
  display: flex;
  justify-content: left;
`

export const UserIcon = styled(BiUserCircle)`
  font-size: 40px;
  margin-right: 20px;
  display: flex;
  height: 100%;
  cursor: pointer;

  &:hover{
    opacity: 0.7;
  }
`


export const Navigation = styled.ul`
  list-style: none;
  display: flex;
  justify-content: left;

  height: 60px;

  padding: 0;
  margin: 0;

`
export const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 60px;
  text-align: center;
  cursor: pointer;

  &:hover{
    background: rgba(0, 0, 0, 0.2);
  }
`
