import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as FriendsActions from "../actions/FriendsActions";
import 'semantic-ui-css/semantic.min.css';
import FriendListComponent from '../components/FriendsListComponent';
import "./styles/Friends.css";
import { Button } from 'semantic-ui-react';
import store from "../store/index";
import HTTPFetchUtil from "../util/HTTPFetchUtil";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import Cookies from 'js-cookie';

class Friends extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userIdFullURL: null,
			isLoggedIn: false,
			userId: null,
			listData: null,
			mode: "friends",
			hostName: "",
			friendButtonColor: "teal",
			requestButtonColor: "grey",
		}
		this.removeFriend = this.removeFriend.bind(this);
		this.approveFriendRequest = this.approveFriendRequest.bind(this);
	}
	
	componentDidMount(){
		let userIdString = ""
		console.log(store.getState())
		try{
			userIdString = Cookies.get("userID").split("/")[4]
		}
		catch(e){
			console.error(e)
		}
		this.setState({
			userIdFullURL: Cookies.get("userID"),
			hostName: Cookies.get("userID").split("/")[2],
			userId: userIdString,
			isLoggedIn: store.getState().loginReducers.isLoggedIn,
		})
		let hostUrl = "/api/author/"+userIdString+""
		let requireAuth = true
		this.props.getCurrentApprovedFriends(hostUrl,requireAuth)
		hostUrl = "/api/followers/"+userIdString
		this.props.getCurrentFriendsRequests(hostUrl,requireAuth)
	}

	GetListView = function(){
		if(this.state.mode === "friends"){
			return this.props.friends
		}
		else if (this.state.mode === "requests"){
			return this.props.requests
		}
		else{
			return null
		}
	}

	approveFriendRequest(authorObj){
		let urlPath = "/api/friendrequest/"
		let body = {
			query: "friendrequest",
			author: {
				id: this.state.userIdFullURL,
				host: "http://"+this.state.hostName+"/",
			},
			friend:{
				id: authorObj.id,
				host: authorObj.host,
			}
		}
		HTTPFetchUtil.sendPostRequest(urlPath, true, body)
            .then((httpResponse) => {
                if (httpResponse.status === 200) {
                    httpResponse.json().then((results) => { 
						this.updateRenderAccept()
						this.updateRenderRemove()
						toast(
							{
								type: 'success',
								icon: 'user',
								title: 'Request accepted!',
								description: <p>You are now friends with {authorObj.displayName}</p>
							}
						);

                    })
				}
				else{
					toast(
						{
							type: 'error',
							icon: 'warning',
							title: 'Error: Request could not be accepted!'
						}
					);
				}
            })
            .catch((error) => {
                console.error(error);
        });
	}

	updateRenderRemove(){
		let authorIdString = this.state.userId
		let hostUrl = "/api/author/"+authorIdString+""
		this.props.getCurrentApprovedFriends(hostUrl,true)
	}

	updateRenderAccept(){
		let authorIdString = this.state.userId
		let hostUrl = "/api/followers/"+authorIdString+""
		this.props.getCurrentFriendsRequests(hostUrl,true)
	}

	removeFriend(authorObj){
		let urlPath = "/api/unfollow/"
		let body = {
			query: "unfollow",
			author: {
				id: this.state.userIdFullURL,
				host: "http://"+this.state.hostName+"/",
			},
			friend:{
				id: authorObj.id,
				host: authorObj.host,
			}
		}
		HTTPFetchUtil.sendPostRequest(urlPath, true, body)
            .then((httpResponse) => {
                if (httpResponse.status === 200) {
                    httpResponse.json().then((results) => { 
						try{
							this.updateRenderAccept()
							this.updateRenderRemove()
						}
						catch(error){
							toast(
								{
									type: 'error',
									icon: 'warning',
									title: 'Could not refresh feed!'
								}
							);
						}
						toast(
							{
								type: 'warning',
								icon: 'user',
								title: 'Friend removed!',
								description: <p>You are no longer friends with {authorObj.displayName}</p>
							}
						);

                    })
				}
				else{
					toast(
						{
							type: 'error',
							icon: 'warning',
							title: 'Error: Friend could not be removed!'
						}
					);
				}
            })
            .catch((error) => {
                console.error(error);
        });
	}

	render() {
	return(	
		<div className="pusher">
			<div id="FriendDiv">
				<Button.Group id="ToggleFriendList">
					<Button id="friends" onClick={() =>{this.setState({mode: "friends",friendButtonColor: "teal", requestButtonColor: "grey"})}} color={this.state.friendButtonColor}>Current Friends</Button>
					<Button.Or/>
					<Button id="requests" onClick={() =>{this.setState({mode: "requests",friendButtonColor: "grey", requestButtonColor: "teal"})}} color ={this.state.requestButtonColor}>Friend Requests</Button>
				</Button.Group>
				<FriendListComponent data={this.GetListView()} mode={this.state.mode} acceptRequest={this.approveFriendRequest} rejectRequest={this.removeFriend}/>
				<SemanticToastContainer position="bottom-left"/>
			</div>
		</div>
	    )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCurrentApprovedFriends: (urlPath, requireAuth) => {
            return dispatch(FriendsActions.getCurrentApprovedFriends(urlPath, requireAuth));
		},
		getCurrentFriendsRequests: (urlPath, requireAuth) => {
            return dispatch(FriendsActions.getCurrentFriendsRequests(urlPath, requireAuth));
        }
    }
}

const mapStateToProps = state => {
	
    return {
		friends: state.friendsReducers.friends,
		requests: state.friendsReducers.requests,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);