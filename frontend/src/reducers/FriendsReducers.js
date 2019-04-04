const initialState = {
    friends: [],
    requests: [],
    numFriendRequests: 0,
    isFetching: true,
};

export default function friendsReducer(state=initialState, action) {
    switch (action.type) {
        case "UPDATE_FRIENDS":
            return Object.assign({}, state, {
                friends: action.payload,
                isFetching: false,
            });
        case "UPDATE_REQUESTS":
            return Object.assign({}, state, {
                requests: action.payload,
                isFetching: false,
            });
        case "NUM_REQUESTS":
            return Object.assign({}, state, {
                numFriendRequests: action.payload,
                isFetching: false,
            });
        
        case "START_FETCHING":
        	return Object.assign({}, state, {
                isFetching: true,
            });
        default:
            return state;
    }
};
