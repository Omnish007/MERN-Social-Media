import { GLOBALTYPES } from "./globalType"
import { postDataAPI, deleteDataAPI, getDataAPI } from "../../utils/fetchData"

export const NOTIFY_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES"
}

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {

    try {

        const res = await postDataAPI("notify", msg, auth.token )
        
    } catch (error) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: error.response.data.msg}})
    }
}

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {

    try {
        const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token )
        
    } catch (error) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: error.response.data.msg}})
    }
}

export const getNotifies = (token) => async (dispatch) => {

    try {
        const res = await getDataAPI(`notifies`, token )
        console.log(res)
        
    } catch (error) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: error.response.data.msg}})
    }
}