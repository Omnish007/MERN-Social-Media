import { GLOBALTYPES } from "./globalType"
import { getDataAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUploads"
 
export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER"
}

export const getProfileUsers = ({users, id, auth}) => async (dispatch) => {

    if(users.every(user => user._id !== id)){

        try {
            dispatch({type:PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`/user/${id}`, auth.token)
            dispatch({
                type:PROFILE_TYPES.GET_USER, 
                payload: res.data
            })
            dispatch({type:PROFILE_TYPES.LOADING, payload: false})

        } catch (error) {
            dispatch({
                type:GLOBALTYPES.ALERT, 
                payload: {error:error.response.data.msg}
            })
        }
    }
}

export const updateProfileUser = ({userData, avatar}) => async (dispatch) => {

    if(!userData.fullname)
    return dispatch({type: GLOBALTYPES.ALERT, payload:{error:"Please Enter your fullname"}})

    if(userData.fullname.length > 25)
    return dispatch({type: GLOBALTYPES.ALERT, payload:{error:"fullname is too long"}})

    if(userData.story.length > 200)
    return dispatch({type: GLOBALTYPES.ALERT, payload:{error:"Story is too long"}})

    try {
        
        let media
        dispatch({type: GLOBALTYPES.ALERT, payload:{loading:true}})

        if(avatar) media = await imageUpload([avatar])
        dispatch({type: GLOBALTYPES.ALERT, payload:{loading:false}})


    } catch (error) {
        dispatch({
            type:GLOBALTYPES.ALERT, 
            payload: {error:error.response.data.msg}
        })
        
    }
} 