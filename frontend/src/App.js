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
import withAuth from "./components/HigherOrder/withAuth";


const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;


const Icon = props => <BaseIcon size={32} icon={props.icon} />;



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	// shouldComponentUpdate() {
    //     return false;
	// }

	render() {
		console.log(window.location.pathname);
		return (
			<BrowserRouter>
				{/*<AppContainer>*/}
					{/*<SideBar/>*/}
					{/*<Body>*/}
						<Switch>
						<Route exact path="/" component={Login}/>
						<Route exact path="/author/:authorId" component={withAuth(Author)}/>
						<Route exact path ="/stream" component={withAuth(Stream)}/>
						<Route exact path ="/friends" component={withAuth(Friends)}/>
						<Route exact path ="/public" component={withAuth(PublicStream)}/>
						<Route component={NotFound} />
					</Switch>
					{/*</Body>*/}
				{/*</AppContainer>*/}
        	</BrowserRouter>
		);
  	}
}

export default App;