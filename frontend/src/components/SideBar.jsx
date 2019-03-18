import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Link} from "react-router-dom";
import './styles/SideBar.css';
import store from "../store/index";
import { withRR4 } from "react-sidenav/withRR4";
import { Nav as BaseNav } from "react-sidenav";
import styled from "styled-components";
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
  ExampleBody as Body
} from "../containers";

import {Tab} from 'semantic-ui-react';
import utils from "../util/utils";


const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh);
  width: 100vw;
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 100px;
  line-height: 22px;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20",
  selectionBgColor: "#00BCD4"
};

const Text = styled.div`
  font-size: 0.72em;
  text-transform: uppercase;
`;

const SideNav = withRR4();

class SideBar extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			selectedPath: "2"
		};
	}

	onItemSelection = arg => {
		// this.setState({ selectedPath: arg.path });
		console.log("on item select");
  };

	render() {
		console.log(this.state);
		let profilePath = "",
			fullAuthorId = "";
		if(store.getState().loginReducers.userId) {
			profilePath = "author/" + utils.getStripedEscapedAuthorId(store.getState().loginReducers.userId);
			fullAuthorId = store.getState().loginReducers.userId;
		}


		return(
			<Navigation>
          <SideNav
			  basePath='/'
            defaultSelectedPath="stream"
            theme={theme}
            onItemSelection={this.onItemSelection}
          >
		  	<Nav
				id={profilePath}
			  	payload={{
					fullAuthorId: fullAuthorId
			  	}}
				className="item sideBarProfile"
			>
              <Text>Profile</Text>
            </Nav>
            <Nav id="stream">
              <Text>Streamx</Text>
            </Nav>
            <Nav id="friends">
              <Text>Friends</Text>
            </Nav>
		  	<Nav id="public">
              <Text>Public</Text>
            </Nav>
			  <Nav id="bb">
              <Text>test link</Text>
            </Nav>
			  <Nav id="cc">
              <Text>logout</Text>
            </Nav>
          </SideNav>
        </Navigation>
		);
	}
}

export default SideBar;