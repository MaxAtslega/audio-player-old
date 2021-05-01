import { HeaderContainer, TitleContainer, Title, Space, Navigation, NavItem, UserIcon } from "./Header.styles"

function HeaderDesktop() {
  return (
    <HeaderContainer>
      <Space>
        <TitleContainer>
          <Title>Klasse 10c</Title>
        </TitleContainer>

        <Navigation>
          <NavItem>Audio</NavItem>
          <NavItem>Audio erstellen</NavItem>
        </Navigation>
      </Space>

      <Space>
        <UserIcon/>
      </Space>

    </HeaderContainer>
  )
}

function HeaderMobile() {

}

export default function Header() {
  return <HeaderDesktop/>;
}
