import { DISCOVER_TYPE } from '../actions/discoverAction'

const initialState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = initialState, action) => {
    switch(action.type){

        case DISCOVER_TYPE.LOADING:
            return{
                ...state,
                loading: action.payload
                
            }

        case DISCOVER_TYPE.GET_POSTS:
            return{
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }

        case DISCOVER_TYPE.UPDATE_POST:
            return{
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            }

        default:
            return state
    }
}

export default discoverReducer
