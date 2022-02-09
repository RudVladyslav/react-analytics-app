import React, {useEffect} from "react"
import {Route, Routes, useNavigate} from "react-router-dom";
import Analytics from "./pages/Analytics";
import {CircularProgress} from "@mui/material";
import SignUp from "./pages/SignUp";
import FieldLevelValidationForm from "./pages/SignIn";


export const useRoutes = (isAuth, isLoading) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/analytics');
        } else {
            navigate('/')
        }
    }, [isAuth])

    if (isLoading) {
        return (
            <div className='preloader-wrap'>
                <CircularProgress />
            </div>
        )
    }

    if (isAuth) {
        return (
            <Routes>
                <Route exact path="/analytics" element={<Analytics/>}/>
            </Routes>
        )
    }

    return (

        <Routes>
            <Route exact path="/" element={<FieldLevelValidationForm/>}/>
            <Route path="/sign_up" element={<SignUp/>}/>
        </Routes>
    )

}