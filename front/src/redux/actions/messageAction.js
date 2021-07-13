import { GLOBALTYPES } from "../actions/globalType"
import { postDataAPI, getDataAPI } from "../../utils/fetchData"

export const MESS_TYPE = {
    ADD_USER: "ADD_USER",
    ADD_MESSAGE: "ADD_MESSAGE",
    GET_CONVERSATIONS: "GET_CONVERSATIONS",
    GET_MESSAGES: "GET_MESSAGES"
}

export const addUser = ({ user, message }) => (dispatch) => {
    if (message.users.every(item => item._id !== user._id)) {
        dispatch({ type: MESS_TYPE.ADD_USER, payload: { ...user, text: "", media: [] } })
    }
}

export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
    dispatch({ type: MESS_TYPE.ADD_MESSAGE, payload: msg })

    // socket
    socket.emit("addMessage", msg)

    try {

        await postDataAPI("message", msg, auth.token)

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
    }

}

export const getConversations = ({ auth }) => async (dispatch) => {

    try {

        const res = await getDataAPI("conversations", auth.token)

        let newArr = []
        res.data.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== auth.user._id) {
                    newArr.push({ ...cv, text: item.text, media: item.media })
                }
            })
        })

        dispatch({ type: MESS_TYPE.GET_CONVERSATIONS,
            payload: {newArr, result:res.data.result} 
        })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
    }

}

export const getMessages = ({ auth, id }) => async (dispatch) => {

    try {

        const res = await getDataAPI(`message/${id}`, auth.token)
        console.log(res)
        dispatch({ type: MESS_TYPE.GET_MESSAGES, payload: res.data })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
    }

}