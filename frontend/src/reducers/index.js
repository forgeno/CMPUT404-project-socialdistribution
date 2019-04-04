import { combineReducers } from 'redux';
import loginReducers from "./LoginReducers";
import friendsReducers from "./FriendsReducers";
import profileReducers from "./ProfileReducers";

const socialDistApp = combineReducers({
	loginReducers,
	friendsReducers,
	profileReducers,

})

export default socialDistApp;