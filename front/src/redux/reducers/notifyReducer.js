import { NOTIFY_TYPES } from "../actions/notifyAction"

const notifyReducer = (state = [], action) => {
    switch(action.type){

        case NOTIFY_TYPES.GET_NOTIFIES:
            return action.payload;

        default:
            return state;
    }
}

export default notifyReducer 