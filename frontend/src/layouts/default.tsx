import React from "react";

interface Props {
  children: JSX.Element;
}

interface State {
  collapseSidebar: boolean;
}

export default class DefaultLayout extends React.Component<Props, State> {
  state: State = {
    collapseSidebar: false,
  };

  handleCollapseSidebar = () => {
    this.setState({
      collapseSidebar: !this.state.collapseSidebar,
    });
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
