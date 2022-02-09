import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {createUser, setIsLoading, setIsUserCreate} from "../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {Alert, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";

const theme = createTheme();

const SignUp = () => {
    const {isUserCreate} = useSelector(({auth}) => ({isUserCreate: auth.isUserCreate}))

    const [userFirstName, setFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(null)

    const [showError, setShowError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setShowAlert(isUserCreate)
        setTimeout(() => dispatch(setIsUserCreate(null)), 1500)
    }, [isUserCreate])


    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (userFirstName && userLastName && email && password) {
            if (password.length > 8) {
                dispatch(createUser({userFirstName, userLastName, email, password}))
                dispatch(dispatch(setIsLoading(true)))
            } else {
                setShowPasswordError(true)
            }
        } else {
            setShowError(true)
        }
    }

    return (
        <>
            {showAlert && <Alert severity="success">Пользователь создан</Alert>}
            {showAlert === false && <Alert severity="error">Такой пользователь уже существует</Alert>}
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
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={(e) => onSubmitHandler(e)} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl margin="normal"
                                                 fullWidth required={true}
                                                 onClick={() => !userFirstName && setShowError(false)}
                                                 error={!userFirstName && showError}>
                                        <InputLabel htmlFor="my-input">First Name</InputLabel>
                                        <Input id="my-input" aria-describedby="my-helper-text"
                                               onChange={e => setFirstName(e.target.value)}
                                        />
                                        <FormHelperText id="my-helper-text">
                                            {showError && !userFirstName
                                                ? 'Это поле не должно быть пустым)'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl margin="normal"
                                                 fullWidth required={true}
                                                 error={!userLastName && showError}
                                                 onClick={() => !userLastName && setShowError(false)}
                                    >
                                        <InputLabel htmlFor="my-input">Last Name</InputLabel>
                                        <Input id="my-input" aria-describedby="my-helper-text"
                                               onChange={e => setUserLastName(e.target.value)}
                                        />
                                        <FormHelperText id="my-helper-text">
                                            {showError && !userLastName
                                                ? 'Это поле не должно быть пустым)'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl margin="normal"
                                                 fullWidth
                                                 required={true}
                                                 onClick={() => !email && setShowError(false)}
                                                 error={!email && showError}
                                    >
                                        <InputLabel htmlFor="my-input">Login</InputLabel>
                                        <Input id="my-input" aria-describedby="my-helper-text"
                                               onChange={e => setEmail(e.target.value)}
                                        />
                                        <FormHelperText id="my-helper-text">
                                            {showError && !email
                                                ? 'Это поле не должно быть пустым)'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl onClick={() => setShowPasswordError(false)}
                                                 margin="normal"
                                                 fullWidth
                                                 required={true}
                                                 error={!password && showError || showPasswordError}>
                                        <InputLabel htmlFor="my-input">Password</InputLabel>
                                        <Input id="my-input" aria-describedby="my-helper-text"
                                               onChange={e => setPassword(e.target.value)}
                                        />
                                        <FormHelperText id="my-helper-text">
                                            {showError && !password
                                                ? 'Это поле не должно быть пустым)'
                                                : ''}
                                            {showPasswordError && 'Длинна пароля должна составлять больше 8 символов'}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography variant="p">
                                        <NavLink to='/'>
                                            Already have an account? Sign in
                                        </NavLink>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SignUp;
