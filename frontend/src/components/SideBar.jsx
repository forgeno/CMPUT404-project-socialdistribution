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
import { Icon } from "react-icons-kit";
import { dashboard } from "react-icons-kit/fa/dashboard";
import { users } from "react-icons-kit/fa/users";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { cubes } from "react-icons-kit/fa/cubes";
import { circleO } from "react-icons-kit/fa/circleO";
import {Tab} from 'semantic-ui-react';
import utils from "../util/utils";

const panes = [
	{ menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
	{ menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
	{ menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]

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
			profilePath = "/author/" + utils.getStripedEscapedAuthorId(store.getState().loginReducers.userId);
			fullAuthorId = store.getState().loginReducers.userId;
		}

		// return (
		// 	<Navigation>
		// 		<SideNav
		// 			defaultSelectedPath="2"
		// 			theme={theme}
		// 			onItemSelection={this.onItemSelection}
		// 		>
		// 		<Link to={{
		// 					  pathname: profilePath,
		// 					  state: {
		// 					  	fullAuthorId: fullAuthorId
		// 					  }
		// 					}} className="item sideBarProfile"
		// 		>
		// 				<Nav id="1">
		// 					<IconCnt>
		// 						<Icon icon={dashboard} />
		// 					</IconCnt>
		// 					<Text>Profile</Text>
		// 				</Nav>
		// 		</Link>
		// 		<Link to={"/aa"}>
		// 			<Nav id="2">
		// 				<IconCnt>
		// 					<Icon icon={users} />
		// 				</IconCnt>
		// 				<Text>Stream</Text>
		// 			</Nav>
		// 		</Link>
		// 		<Link to="/bb" className="item sideBarItem">
		// 			<Nav id="3">
		// 				<IconCnt>
		// 					<Icon icon={shoppingCart} />
		// 				</IconCnt>
		// 				<Text>Friends</Text>
		// 			</Nav>
		// 		</Link>
		// 		<Link to="/cc">
		// 			<Nav id="4">
		// 				<IconCnt>
		// 					<Icon icon={circleO} />
		// 				</IconCnt>
		// 				<Text>Public</Text>
		// 			</Nav>
		// 		</Link>
		// 		<Link to="/" className="item sideBarItem">
		// 			<Nav id="5">
		// 				<IconCnt>
		// 					<Icon icon={cubes} />
		// 				</IconCnt>
		// 				<Text>Logout</Text>
		// 			</Nav>
		// 		</Link>
		// 		</SideNav>
		// 	</Navigation>
		//
		// );

		// let aa = ()=>{return(<Link to="/cc"></Link>)}

		return(
			<Navigation>
          <SideNav
			  basePath='/'
            defaultSelectedPath="stream"
            theme={theme}
            onItemSelection={this.onItemSelection}
          >
		  	<Nav id="X">
              <Text>Profile</Text>
            </Nav>
            <Nav id="stream">
              <Text>Stream</Text>
            </Nav>
            <Nav id="friends">
              <Text>Friends</Text>
            </Nav>
		  	<Nav id="public">
              <Text>Public</Text>
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