const initialState = {
                        displayName: "",
                    };

export default function profileReducers(state=initialState,action) {
    switch (action.type) {
        case "EDIT_PROFILE":
            return Object.assign({}, state, {
                displayName: action.payload.displayName
              });
        default:
            return '';
    }
};
