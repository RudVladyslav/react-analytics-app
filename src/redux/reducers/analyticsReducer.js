import {generateAnalyticsData} from "../../API/api_function";


const SET_GRAPHIC_DATA = 'GET_GRAPHIC_DATA'
const SET_ITEMS_LIST_DATA = 'SET_ITEMS_LIST_DATA'
const CLEAR_DATA = 'CLEAR_DATA'
const SET_IS_LOADING_DATA = ' SET_IS_LOADING_DATA'


const initialState = {
    graphicData: [],
    listData: [],
    isLoadingData:false
}

const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GRAPHIC_DATA: {
            return {
                ...state,
                graphicData: action.graphicData
            }
        }
        case SET_ITEMS_LIST_DATA: {
            return {
                ...state,
                listData: action.listData
            }
        }
        case CLEAR_DATA: {
            return {
                ...state,
                graphicData: [],
                listData: []
            }
        }
        case SET_IS_LOADING_DATA:{
            return {
                ...state,
                isLoadingData: action.isLoadingData
            }
        }
        default:
            return state
    }
}

export default analyticsReducer

// ACTION CREATOR

export const setGraphicData = (graphicData) => ({type: SET_GRAPHIC_DATA, graphicData})

export const setListData = (listData) => ({type: SET_ITEMS_LIST_DATA, listData})

export const clearData = () => ({type: CLEAR_DATA})

export const setIsLoadingData = (isLoadingData) => ({type: SET_IS_LOADING_DATA, isLoadingData})


// THUNK CREATOR

export const getAnalyticsData = () => async (dispatch) => {
    await generateAnalyticsData().then(({graphicData, listData}) => {
        dispatch(setListData(listData))
        dispatch(setGraphicData(graphicData))
        dispatch(setIsLoadingData(false))
    })
}

