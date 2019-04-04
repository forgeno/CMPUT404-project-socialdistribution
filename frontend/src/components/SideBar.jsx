import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import './styles/SideBar.css';
import * as FriendsActions from "../actions/FriendsActions";
import AbortController from 'abort-controller';
import Cookies from 'js-cookie';
import store from '../store/index.js';


const controller = new AbortController();
const signal = controller.signal;
signal.addEventListener("abort", () => {});

class SideBar extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			displayLetter: Cookies.get("displayName").charAt(0).toUpperCase() || this.props.displayName.charAt(0).toUpperCase(),
		};
	}
	
	componentDidMount() {
  		this.timer = setInterval(()=> this.checkForFriendRequest(), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
  		this.timer = null; 
		controller.abort();
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.displayName !== nextProps.displayName) {
			if (nextProps.displayName) {
				this.setState({
					displayLetter: nextProps.displayName.charAt(0).toUpperCase(),
				})
			}
		}	
		
	}
	
	checkForFriendRequest() {
		if (window.location.pathname !== "/") {
			const urlPath = "/api/count_friendrequest/",
			requireAuth = true;	
			this.props.getNumFriendsRequests(urlPath,requireAuth);
		}
	}

	render() {
		const userId = store.getState().loginReducers.userId || Cookies.get("userID");
		const currentLocation = this.props.currentLoc;

		let $friendRequestNotification = (<span></span>);
		if(this.props.numFriendRequests > 0 && currentLocation !== "/friends") {
			$friendRequestNotification = (
					<span className="notificationNumber">{this.props.numFriendRequests} </span>
			);
		}
		
		return(
				<Sidebar as={Menu} direction="left" width="thin" visible={true} inverted vertical icon color={"blue"} className="sideBarMenu">						
					
					<Menu.Item as={Link} to={"/author/" + encodeURIComponent(userId)} active={currentLocation === "author"} className="sideBarProfile">					
						<span className={"ui circular tiny bordered centered image"}> 	
							<img className="profileBubbleInSidebar" alt="It's you!" src={require('../assets/images/default2.png')}/>
							<span className="profileBubbleLetter"> {this.state.displayLetter} </span>
						</span>
						<figcaption>Profile</figcaption>
					</Menu.Item>

					<Menu.Item as={Link} to={"/stream"} active={currentLocation === "stream"} className="sideBarItem">
						<Icon name="tint"/>
					  	Stream
					</Menu.Item>

					<Menu.Item as={Link} to={"/friends"} active={currentLocation === "friends"} className="sideBarItem">
						{$friendRequestNotification}
						<Icon name="users"/>
					 	 Friends
					</Menu.Item>
					
					
					<Menu.Item as={Link} to={"/public"} active={currentLocation === "public"} className="sideBarItem">
						<Icon name="globe"/>
					  	Public
					</Menu.Item>

					<Menu.Item as={Link} to={"/logout"} className="sideBarItem">
						<Icon name="sign-out"/>
					  	Logout
					</Menu.Item>
					
				</Sidebar>
		)
	}
}

const mapStateToProps = state => {
	return {
		displayName: state.profileReducers.displayName, 
		numFriendRequests: state.friendsReducers.numFriendRequests,
	}
}

const mapDispatchToProps = dispatch => {
    return {
		getNumFriendsRequests: (urlPath, requireAuth) => {
            return dispatch(FriendsActions.getNumFriendsRequests(urlPath, requireAuth));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);