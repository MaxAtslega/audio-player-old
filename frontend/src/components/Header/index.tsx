import { HeaderContainer, TitleContainer, Title, Space, Navigation, NavItem, UserIcon, SidebarLeftIcon, SidebarRightIcon, TitleShort, UserToggleBar, SidebarContent,SidebarContainer, SidebarItem, ControlItem, ControlItems} from "./Header.styles"
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import { BiMoon, BiSun } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { loginAction, logoutAction } from "../../actions/auth.actions";
import { useDispatch } from "react-redux";
import { ThemeContext } from "@providers/ThemeProvider";

export default function Header() {
  const [toggleBarStatus, setToggleBarStatus] = useState(false);
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <HeaderContainer>
        <Space>
          <TitleContainer>
            <Title>{process.env.NAME}</Title>
            <TitleShort>{process.env.SHORT_NAME}</TitleShort>
          </TitleContainer>

          <Navigation>
            <NavItem>Audios</NavItem>
            <NavItem>Audio erstellen</NavItem>
          </Navigation>
        </Space>

        <Space>
          <UserIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/>
          {
            !toggleBarStatus ? <SidebarRightIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/> : <SidebarLeftIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/>
          }
        </Space>

      </HeaderContainer>
      <UserToggleBar className={toggleBarStatus ? "active" : ""}>
        <SidebarContainer>
          <SidebarContent>
            <SidebarItem>
              <SidebarItem className={"mobile"}><Link href={"/"}>Audios</Link></SidebarItem>
              <SidebarItem className={"mobile"}><Link href={"/"}>Audio erstellen</Link></SidebarItem>
              <ControlItems>

                {
                  theme === "light" ?<ControlItem onClick={() => setTheme("dark")}><BiMoon/></ControlItem> : <ControlItem onClick={() => setTheme("light")}><BiSun/></ControlItem>
                }
                <ControlItem onClick={() => dispatch(logoutAction())}><HiLogout/></ControlItem>
              </ControlItems>
            </SidebarItem>
          </SidebarContent>
        </SidebarContainer>

      </UserToggleBar>
    </HeaderContainer>
  )
}

