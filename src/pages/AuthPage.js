import React from 'react';
import {Grid, Snackbar, TextField, Typography} from "@mui/material";
import NavbarAuthScreen from "../components/NavbarAuthScreen";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {isLoggedIn, loginUser, registerUser} from "../services/AuthService";
import {Navigate} from "react-router-dom";
import {attachRouter} from "../services/CommonService";

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emailRegister: '',
            usernameRegister: '',
            passwordRegister: '',
            usernameLogin: '',
            passwordLogin: '',
            open: false,
            errorMessage: ''}

        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onClickLogin() {
        let creds = {
            username: this.state.usernameLogin,
            password: this.state.passwordLogin,
        }
        loginUser(creds).then(res => {
            if (res.ok) {
                let token = ''
                sessionStorage.setItem('username', creds.username)
                res.json().then(data => token = data.token).then(() => {
                    sessionStorage.setItem('token', token);
                    this.props.router.navigate('/home');
                })
            }
            else{
                res.json().then(x => {
                    this.setState({
                        open: true,
                        errorMessage: (x.error === 'User  does not exist' || creds.password === '') ? 'PlEaSe eNtEr CrEds' : x.error
                    });
                })
            }
        })
    }

    onClickRegister(){
        let user = {
            username: this.state.usernameRegister,
            password: this.state.passwordRegister,
            email: this.state.emailRegister
        }
        if(user.username === '' || user.password === '' || user.email === ''){
            this.setState({
                open: true,
                errorMessage: 'PlEaSe eNtEr iNfO'
            });
            return;
        }
        registerUser(user).then(res => {
            if (!res.ok) {
                res.json().then(x => {
                    this.setState({
                        open: true,
                        errorMessage: x.error
                    });
                })
            }
            else{
                window.location.reload();
            }
        })
    }

    handleClose(){
        this.setState({
            open: false
        });
    }

    render() {

        if (isLoggedIn()) {
            return <Navigate replace='true' to='/home'/>
        }

        return (
            <div className="AuthPage">
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={2000}
                    message={this.state.errorMessage}
                />
                <NavbarAuthScreen/>
                {/*<div className={classes.}*/}
                <Grid container direction='row' justifyContent='center' spacing='2vw' minHeight='80vh' alignItems='center' mt={{xs: "1vh", md: "0vh"}}>
                    <Grid item>
                        <Box
                            component="div"
                            sx={{display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                minWidth: { xs: '75vw', md: '25vw' },
                                maxWidth: { xs: '75vw', md: '25vw' },
                                backgroundColor: '#e0e0e0',
                                borderRadius: '10px',
                                padding: '20px',
                            }}>
                            <Grid container direction="column" alignItems='center' spacing='1vh'>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ fontWeight: 'bold', minWidth: '10vw', textAlign: 'center'}}
                                    >REGISTER
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField name="emailRegister" onChange={this.handleInputChange} label="Email" variant="standard" sx={{ minWidth: '20vw'}}/>
                                </Grid>
                                <Grid item>
                                    <TextField name="usernameRegister" onChange={this.handleInputChange} label="Username" variant="standard" sx={{ minWidth: '20vw'}}/>
                                </Grid>
                                <Grid item>
                                    <TextField name="passwordRegister" onChange={this.handleInputChange} label="Password" type="password" variant="standard" sx={{ minWidth: '20vw'}}/>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={this.onClickRegister}
                                    >
                                        Register now!
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            component="div"
                            sx={{display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                minWidth: { xs: '75vw', md: '25vw' },
                                maxWidth: { xs: '75vw', md: '25vw' },
                                backgroundColor: '#e0e0e0',
                                borderRadius: '10px',
                                padding: '20px'
                            }}>
                            <Grid container direction="column" alignItems='center' spacing='2vh'>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ fontWeight: 'bold', minWidth: '10vw', textAlign: 'center', marginBottom: '3vh'}}
                                    >LOGIN
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField name="usernameLogin" onChange={this.handleInputChange} label="Username" variant="standard" sx={{ minWidth: '20vw'}}/>
                                </Grid>
                                <Grid item>
                                    <TextField name="passwordLogin" onChange={this.handleInputChange} label="Password" type="password" variant="standard" sx={{ minWidth: '20vw'}}/>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={this.onClickLogin}
                                    >
                                        Login!
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                </div>
        );
    }
}

export default attachRouter(AuthPage);