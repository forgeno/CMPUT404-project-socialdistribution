import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import Cookies from 'js-cookie';
import * as LoginActions from "../actions/LoginActions";
import * as FriendsActions from "../actions/FriendsActions";
import * as ProfileActions from "../actions/ProfileActions";
import {connect} from "react-redux";

class Logout extends Component {

    constructor(props) {
		super(props);
		Cookies.remove("username");
        Cookies.remove("userID");
        Cookies.remove("displayName");
        Cookies.remove("userPass");
        this.props.sendLogout();
        this.props.clearFriendStore();
        this.props.clearProfileStore();
    }

	render() {
        return(
            <Redirect push to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendLogout: () => {
            return dispatch(LoginActions.sendLogout());
        },
        clearFriendStore: () => {
        	return dispatch(FriendsActions.clearStore());
        },
        clearProfileStore: () => {
        	return dispatch(ProfileActions.clearStore());
        },
    }
};

export default connect(null, mapDispatchToProps)(Logout);