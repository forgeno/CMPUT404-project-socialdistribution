import React, { Component } from 'react';
import './App.css';
import Author from "./pages/Author";
import Stream from "./pages/Stream";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import PublicStream from "./pages/PublicStream";
import NotFound from "./components/NotFound";
import SideBar from "./components/SideBar";
import {Route, Switch, BrowserRouter, Link, Router} from "react-router-dom";
import {SideNav, Nav as BaseNav} from "react-sidenav";

import 'semantic-ui-css/semantic.min.css';
// import './styles/SideBar.css';
import styled from "styled-components";

import { dashboard } from "react-icons-kit/fa/dashboard";
import { users } from "react-icons-kit/fa/users";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { cubes } from "react-icons-kit/fa/cubes";
import { circleO } from "react-icons-kit/fa/circleO";
import {Tab} from 'semantic-ui-react';

import { Icon as BaseIcon } from "react-icons-kit";
// import { AppNavigation } from "./AppNavigation";

import { Title, AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
  ExampleBody as Body } from "./containers";
import store from "./store/index";


const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
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

const Icon = props => <BaseIcon size={32} icon={props.icon} />;



class App extends Component {

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

	getComponent() {
		// if(window.location.pathname !== "/") {
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
					<Body>
						<Switch>
						<Route exact path="/" component={Login}/>
						<Route exact path="/author/:authorId" component={Author}/>
						<Route exact path ="/stream" component={Stream}/>
						<Route exact path ="/friends" component={Friends}/>
						<Route exact path ="/public" component={PublicStream}/>
						<Route component={NotFound} />
					</Switch>
					</Body>
			  </AppContainer>
			)
		// }
		// else {
		// 	return (<div>{null}</div>)
		// }
	}

	render() {
		console.log(window.location.pathname);
		return (
			<BrowserRouter>
				{this.getComponent()}
        	</BrowserRouter>
		);
  	}
}

export default App;