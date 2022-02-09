import React from 'react';
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import {clearUserData, setIsAuth} from "../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {clearData} from "../redux/reducers/analyticsReducer";
import Container from "@mui/material/Container";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
    },
};
theme.typography.h6 = {
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
        fontSize: '20px',
    },
};
theme.typography.h5 = {
    fontSize: '1.2rem',
    color:'#fff',
    fontWeight:'inherit',
    [theme.breakpoints.up('md')]: {
        fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
    },
};


const Header = () => {
    const {userLastName, userFirstName, isAuth} = useSelector(({auth}) => {
        return {
            isAuth: auth.isAuth,
            userFirstName: auth.userFirstName,
            userLastName: auth.userLastName
        }
    })


    const dispatch = useDispatch()

    const onClickQuiet = () => {
        dispatch(setIsAuth(false))
        dispatch(clearUserData())
        dispatch(clearData())
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position={"static"}>
                <Container component={"div"} maxWidth="lg">
                    <Toolbar sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Typography variant={'h4'} component={"span"}>AnalyticsApp</Typography>
                        {!isAuth &&
                        <Container sx={{display: "flex", justifyContent: "flex-end"}}>
                            <NavLink to={'/'}>
                                <IconButton color={'inherit'}>
                                    <Typography variant={'h5'} sx={{mr: '2%'}} color={'#fff'}>
                                        SingIn
                                    </Typography>
                                </IconButton>

                            </NavLink>
                            <NavLink to={'/sign_up'}>
                                <IconButton color={'inherit'}>
                                    <Typography variant={'h5'}>
                                        SingUp
                                    </Typography>
                                </IconButton>
                            </NavLink>
                        </Container>
                        }
                        {isAuth &&
                        <Container sx={{display: "flex", justifyContent: "flex-end", alignItems: 'center'}}>
                            <Typography variant={'h6'} component={"p"} mr={'3%'}
                                        fontStyle={'italic'}>Hello {userLastName} {userFirstName}!</Typography>
                            <IconButton onClick={onClickQuiet} color={'primary'}>
                                <Typography variant={'h5'} >
                                    LogOff
                                </Typography>
                            </IconButton>
                        </ Container>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;