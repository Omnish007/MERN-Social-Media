import { GLOBALTYPES } from "./globalType"
import { imageUpload } from "../../utils/imageUploads"
import { postDataAPI } from "../../utils/fetchData"

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST"
}

export const createPost = ({ content, images, auth }) => async (dispatch) => {

    let media = []
    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (images.length > 0) {
            media = await imageUpload(images)
        }

        const res = await postDataAPI("posts", { content, images: media }, auth.token )

        dispatch({type: POST_TYPES.CREATE_POST, payload: res.data.newPost})

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })

    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.message.data.msg }
        })
    }
}