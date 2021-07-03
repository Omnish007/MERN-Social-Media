import { GLOBALTYPES } from "./globalType"
import { POST_TYPES } from "./postAction"
import { postDataAPI } from "../../utils/fetchData"

export const createCommnet = (post, newComment, auth) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }

    dispatch({ type: POST_TYPES.UPDATE_POSTS, payload: newPost })

    try {

        const data = { ...newComment, postId: post._id }
        const res = await postDataAPI("comment", data, auth.token)

        const newData = {...res.data.newComment, user: auth.user}
        const newPost = { ...post, comments: [...post.comments, newData] }
        dispatch({ type: POST_TYPES.UPDATE_POSTS, payload: newPost })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
    }
}
