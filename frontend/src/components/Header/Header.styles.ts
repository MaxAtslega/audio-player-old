import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  background-color: var(--background-header);
  color: var(--text-header);
  height: 60px;
  margin-bottom: 40px;

  @media only screen and (max-width: 730px) {
    border-radius: 0;
    position: fixed;
    z-index: 100;
  }
`;
export const TitleContainer = styled.div`
  display: inline-block;

  padding-left: 20px;
  padding-right: 20px;
  font-size: 25px;
  height: 60px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 730px) {
    background: none;
  }
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 25px;
  font-weight: bold;

  @media only screen and (max-width: 730px) {
    display: none;
  }
`;

export const TitleShort = styled.h1`
  display: none;
  align-items: center;
  height: 60px;
  font-size: 25px;
  font-weight: bold;

  @media only screen and (max-width: 730px) {
    display: flex;
  }
`;

export const Space = styled.div`
  height: 100%;
  display: flex;
  justify-content: left;
`;

export const UserIcon = styled(BiUserCircle)`
  font-size: 40px;
  margin-right: 20px;
  height: 100%;
  cursor: pointer;
  display: flex;

  &:hover {
    opacity: 0.7;
  }

  @media only screen and (max-width: 730px) {
    display: none;
  }

  path {
    pointer-events: none;
  }
`;

export const UserToggleBar = styled.div`
  position: fixed;

  height: calc(100vh - 60px);
  z-index: 100;
  right: 0;
  margin-top: 60px;
  display: none;
  width: 70%;

  &.active {
    display: block;
  }

  @media only screen and (min-width: 730px) {
    position: relative;
    width: 0;
    height: 400px;
    top: 10px;
  }
`;

export const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: right;
  background-color: var(--background-header);

  @media only screen and (min-width: 730px) {
    text-align: center !important;
    position: absolute;

    left: -300px;
    width: 300px;
    height: auto;
    border-radius: 10px;
  }
`;

export const SidebarRightIcon = styled(CgMenuRight)`
  font-size: 40px;
  margin-right: 20px;
  height: 100%;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: 730px) {
    display: flex;
  }

  &:hover {
    opacity: 0.7;
  }

  path {
    pointer-events: none;
  }
`;

export const SidebarLeftIcon = styled(CgMenuLeft)`
  font-size: 40px;
  margin-right: 20px;
  height: 100%;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: 730px) {
    display: flex;
  }

  &:hover {
    opacity: 0.7;
  }

  path {
    pointer-events: none;
  }
`;

export const Navigation = styled.ul`
  list-style: none;
  display: flex;
  justify-content: left;

  height: 60px;

  padding: 0;
  margin: 0;

  @media only screen and (max-width: 730px) {
    display: none;
  }
`;
export const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 60px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const ControlItems = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;

  height: 60px;

  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
`;

export const ControlItem = styled.li`
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  svg {
    pointer-events: none;
  }
`;

export const SidebarContent = styled.ul`
  list-style: none;
  height: 100%;
  width: 100%;

  margin: 0;
  padding: 0;
`;

export const SidebarItem = styled.li`
  padding: 15px 20px;
  display: inline-block;
  width: 100%;
  cursor: pointer;

  @media only screen and (min-width: 730px) {
    &.mobile {
      display: none;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
