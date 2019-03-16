import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Link} from "react-router-dom";
import './styles/SideBar.css';
import store from "../store/index";
import { SideNav, Nav as BaseNav } from "react-sidenav";
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

class SideBar extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		};
	}	

	GetAuthorIdString(){
		let authorIdString = "";
		try{
			authorIdString = "/author/"+store.getState().loginReducers.userId.split("/")[4];
		}
		catch(e){
			console.log("Error: Could not retrieve user Id in profile");
			return e
		}
		console.log(authorIdString);
		return authorIdString
	}

	render() {
		if(window.location.pathname !== "/") {
			return(

				<AppContainer>
					<Navigation>
						<SideNav
							defaultSelectedPath="1"
							theme={theme}
							onItemSelection={this.onItemSelection}
						>
						<Link to={this.GetAuthorIdString()}>
								<Nav id="1">
									<IconCnt>
										<Icon icon={dashboard} />
									</IconCnt>
									<Text>Profile</Text>
								</Nav>
						</Link>
						<Link to={"/stream"}>
							<Nav id="2">
								<IconCnt>
									<Icon icon={users} />
								</IconCnt>
								<Text>Stream</Text>
							</Nav>
						</Link>
						<Link to="/friends" className="item sideBarItem">
							<Nav id="3">
								<IconCnt>
									<Icon icon={shoppingCart} />
								</IconCnt>
								<Text>Friends</Text>
							</Nav>
						</Link>
						<Link to="/public">
							<Nav id="4">
								<IconCnt>
									<Icon icon={circleO} />
								</IconCnt>
								<Text>Public</Text>
							</Nav>
						</Link>
						<Link to="/" className="item sideBarItem">
							<Nav id="5">
								<IconCnt>
									<Icon icon={cubes} />
								</IconCnt>
								<Text>Logout</Text>
							</Nav>
						</Link>
						</SideNav>
					</Navigation>
					{/* <Body>
						{/* <Tab panes={panes} /> */}
					{/* </Body> */}
			  </AppContainer>
					// <div className="ui left fixed vertical inverted sidebar labeled icon menu blue visible sideBarMenu">						
					// 	<Link to={this.GetAuthorIdString()} className="item sideBarProfile">
					// 		<span className={"ui circular tiny bordered centered image"}>						
					// 			<img alt="It's you!" src={require('../assets/images/default.png')}/>
					// 		</span>
					// 	  	<figcaption>Profile</figcaption>
					// 	</Link>

					// 	<Link to={"/stream"} className="item sideBarItem">
					// 		<i className="tint icon"/>
					// 	  	Stream
					// 	</Link>

					// 	<Link to="/friends" className="item sideBarItem">
					// 		<i className="users icon"/>
					// 	 	 Friends
					// 	</Link>

					// 	<Link to="/public" className="item sideBarItem">
					// 		<i className="globe icon"/>
					// 	  	Public
					// 	</Link>

					// 	<Link to="/" className="item sideBarItem">
					// 		<i className="sign-out icon"/>
					// 	  	Logout
					// 	</Link>
					// </div>
			)
		}
		else {
			return (<div>{null}</div>)
		}
	}
}

export default SideBar;