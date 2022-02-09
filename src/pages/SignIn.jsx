import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Alert, CssBaseline, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {setIsFailedLogIn, setIsLoading, signIn} from "../redux/reducers/authReducer";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";


const theme = createTheme();

const SignIn = () => {
    const {isFailedLogIn} = useSelector(({auth}) => ({isFailedLogIn: auth.isFailedLogIn}))
    const dispatch = useDispatch()

    const [showError, setShowError] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setShowAlert(isFailedLogIn)
        setTimeout(() => dispatch(setIsFailedLogIn(false)), 1500)
    }, [isFailedLogIn])

    useEffect(() => {
        setTimeout(() => setShowError(false), 2000)
    }, [showError])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(setIsLoading(true))
            dispatch(signIn(email, password))
        } else {
            setShowError(true)
        }
    }

    return (
        <>
            {showAlert && <Alert severity="error">Неправильно введён логин или пароль</Alert>}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form"
                             onSubmit={(e) => onSubmitHandler(e)}
                             noValidate sx={{mt: 1}}>

                            <FormControl autoFocus margin="normal" fullWidth required={true} error={!email && showError}>
                                <InputLabel htmlFor="my-input">Login</InputLabel>
                                <Input id="my-input" aria-describedby="my-helper-text"
                                       onChange={e => setEmail(e.target.value)}
                                />
                                <FormHelperText id="my-helper-text">
                                    {!email && showError ? 'Это поле не должно быть пустым)' : 'Введите логин'}
                                </FormHelperText>
                            </FormControl>

                            <FormControl margin="normal" fullWidth required={true} error={!password && showError}>
                                <InputLabel htmlFor="my-input">Password</InputLabel>
                                <Input id="my-input" aria-describedby="my-helper-text"
                                       onChange={e => setPassword(e.target.value)}
                                />
                                <FormHelperText id="my-helper-text">
                                    {showError && !password
                                        ? 'Это поле не должно быть пустым)'
                                        : 'Введите пароль'}
                                </FormHelperText>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}

                            >
                                Sign In
                            </Button>

                            <Grid container justifyContent="center">
                                <NavLink to={'/sign_up'}>
                                    <Typography variant="p">
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </NavLink>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>


    );
};
export default SignIn;










