import React, {useEffect} from 'react';
import {getAnalyticsData, setIsLoadingData} from "../redux/reducers/analyticsReducer";
import {useDispatch, useSelector} from "react-redux";
import VirtualizedList from "../component/ItemsList";
import Graphic from "../component/Graphic";
import {CircularProgress} from "@mui/material";


const Analytics = () => {
    const dispatch = useDispatch()

    const {isLoadingData} = useSelector(({analyticData}) => {
        return {
            isLoadingData: analyticData.isLoadingData
        }
    })

    useEffect(() => {
        dispatch(setIsLoadingData(true))
        dispatch(getAnalyticsData())
    }, [])

    if (isLoadingData) {
        return (
            <div className='preloader-wrap'>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <>
            <Graphic/>
            <VirtualizedList/>
        </>
    );
};

export default Analytics;
