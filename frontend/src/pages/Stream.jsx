import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as FriendsActions from "../actions/FriendsActions";
import StreamFeed from '../components/StreamFeed';
import { SemanticToastContainer } from 'react-semantic-toasts';
import store from '../store/index.js';
import Cookies from 'js-cookie';
import './styles/Stream.css';
import utils from "../util/utils";

class Stream extends Component {
	render() {
		const storeItems = store.getState().loginReducers;
		this.props.getCurrentApprovedFriends("/api/author/" + utils.getShortAuthorId(Cookies.get("userID") || storeItems.userId), true);
		return(	
			<div className="pusher">
				<StreamFeed storeItems={storeItems} getGithub={true} urlPath="/api/author/posts/" />
                <SemanticToastContainer position="bottom-left"/>
			</div>
			)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentApprovedFriends: (urlPath, requireAuth) => {
            return dispatch(FriendsActions.getCurrentApprovedFriends(urlPath, requireAuth));
		},
    }
};

export default connect(null, mapDispatchToProps)(Stream);
