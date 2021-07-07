import { GLOBALTYPES } from "./globalType"
import { getDataAPI } from "../../utils/fetchData"

export const DISCOVER_TYPE = {
    LOADING: "LOADING_DISCOVER",
    GET_POSTS: "GET_DISCOVER_POSTS",
    UPDATE_POST:"UPDATE_DISCOVER_POST",
}

export const getDiscoverPosts = (token) => async (dispatch) =>{
    try {
        
        dispatch({type: DISCOVER_TYPE.LOADING, payload: true})

        const res = await getDataAPI(`post_discover`, token)
        dispatch({type: DISCOVER_TYPE.GET_POSTS, payload: res.data})

        dispatch({type: DISCOVER_TYPE.LOADING, payload: false})

    } catch (error) {
        dispatch({type: GLOBALTYPES.ALERT, payload:{error: error.response.data.msg}})
    }
}