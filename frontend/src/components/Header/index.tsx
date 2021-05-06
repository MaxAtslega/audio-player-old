import { HeaderContainer, TitleContainer, Title, Space, Navigation, NavItem, UserIcon, SidebarLeftIcon, SidebarRightIcon, TitleShort, UserToggleBar, SidebarContent,SidebarContainer, SidebarItem, ControlItem, ControlItems} from "./Header.styles"
import { useContext, useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { logoutAction } from "@actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@providers/ThemeProvider";
import { isAdmin } from "@selectors/login.selectors";
import { push } from "connected-next-router";

export default function Header() {
  const [toggleBarStatus, setToggleBarStatus] = useState(false);
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);
  const admin = useSelector(isAdmin);

  useEffect(() =>  {
    const handleClick = (event: any) => {
      if (!document.getElementById("user-toggle-bar")?.contains(event.target) && !event.target.matches(UserIcon) && !event.target.matches(SidebarRightIcon) && !event.target.matches(SidebarLeftIcon)){
        setToggleBarStatus(false);
      }
    }
    window.addEventListener("click", handleClick)

    return () => {
      window.addEventListener("click", handleClick)
    }
  }, [])

  return (
    <HeaderContainer>
      <HeaderContainer>
        <Space>
          <TitleContainer>
            <Title>{process.env.NAME}</Title>
            <TitleShort>{process.env.SHORT_NAME}</TitleShort>
          </TitleContainer>

          <Navigation>
            <NavItem onClick={() => dispatch(push("/"))}>Audios</NavItem>
            {admin ?  <NavItem onClick={() => dispatch(push("/create"))}>Audio erstellen</NavItem> : null }
          </Navigation>
        </Space>

        <Space>
          <UserIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/>
          {
            !toggleBarStatus ? <SidebarRightIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/> : <SidebarLeftIcon onClick={() => setToggleBarStatus(!toggleBarStatus)}/>
          }
        </Space>

      </HeaderContainer>
      <UserToggleBar id={"user-toggle-bar"} className={toggleBarStatus ? "active" : ""}>
        <SidebarContainer>
          <SidebarContent>
            <SidebarItem onClick={() => dispatch(push("/"))} className={"mobile"}>Audios</SidebarItem>
            {admin ? <SidebarItem onClick={() => dispatch(push("/create"))} className={"mobile"}>Audio erstellen</SidebarItem> : null }

            <SidebarItem>
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

