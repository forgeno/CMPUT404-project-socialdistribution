import React, { Component } from 'react';
import './App.css';
import Author from "./pages/Author";
import Stream from "./pages/Stream";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import PublicStream from "./pages/PublicStream";
import NotFound from "./components/NotFound";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import withAuth from "./components/HigherOrder/withAuth";


class App extends Component {

	shouldComponentUpdate() {
        return false;
	}

	render() {
		console.log(window.location.pathname);
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login}/>
					<Route exact path="/author/:authorId" component={withAuth(Author)}/>
					<Route exact path ="/stream" component={withAuth(Stream)}/>
					<Route exact path ="/friends" component={withAuth(Friends)}/>
					<Route exact path ="/public" component={withAuth(PublicStream)}/>
					<Route component={NotFound} />
				</Switch>
        	</BrowserRouter>
		);
  	}
}

export default App;