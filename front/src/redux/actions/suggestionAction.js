import { GLOBALTYPES } from "../actions/globalType"
import { getDataAPI } from "../../utils/fetchData"

export const SUGGEST_TYPES = {
    LOADING: "LOADING_SUGGES",
    GET_USERS: "GET_USERS_SUGGES",
}

export const getSuggestions = (token) => async (dispatch) => {
    try {

        dispatch({ type: SUGGEST_TYPES.LOADING, payload: true })

        const res = await getDataAPI(`suggestionUser`, token)
        dispatch({ type: SUGGEST_TYPES.GET_USERS, payload: res.data })

        dispatch({ type: SUGGEST_TYPES.LOADING, payload: false })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
    }
}