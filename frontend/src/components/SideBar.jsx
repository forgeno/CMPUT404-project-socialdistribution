import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
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

import utils from "../util/utils";



const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 100px;
  line-height: 22px;
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

	render() {
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
                >
                    <Nav
                        id={profilePath}
                        payload={{
                            fullAuthorId: fullAuthorId
                        }}
                        className="item sideBarProfile"
                    >
                        <span className={"ui circular tiny bordered centered image"}>
                            <img alt="It's you!" src={require('../assets/images/default.png')}/>
                        </span>
                        <Text>Profile</Text>
                    </Nav>
                    <Nav id="stream">
                        <i className="tint icon"/>
                        <Text>Stream</Text>
                    </Nav>
                    <Nav id="friends">
                        <i className="users icon"/>
                        <Text>Friends</Text>
                    </Nav>
                    <Nav id="public">
                        <i className="globe icon"/>
                        <Text>Public</Text>
                    </Nav>
                    <Nav id="logout">
                        <i className="sign-out icon"/>
                        <Text>logout</Text>
                    </Nav>
                </SideNav>
            </Navigation>
		);
	}
}

export default SideBar;