import Cookies from 'js-cookie';

export const editProfile = (results) => {
    return (dispatch, getstate) => {
					const newResults = {
						displayName: results.displayName,
					}
					
					// Expiry time for cookie: 1 == 1 day. 
					Cookies.remove("displayName");
					Cookies.set("displayName", newResults.displayName, {expires: 1});


					return dispatch({
						type: "EDIT_PROFILE",
						payload: newResults
					});
	}
}

export const clearStore = () => {
    return (dispatch) => {
                        return dispatch({
                            type: "CLEAR_STORE",
                            payload: ''
                        })
           }
}