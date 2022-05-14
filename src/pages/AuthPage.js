import React from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import NavbarAuthScreen from "../components/NavbarAuthScreen";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {LoginUser, RegisterUser} from "../services/AuthService";
import {Navigate, useNavigate} from "react-router-dom";

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emailRegister: '',
            usernameRegister: '',
            passwordRegister: '',
            usernameLogin: '',
            passwordLogin: ''}

        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);

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

    onClickLogin(){
        let creds = {
            username: this.state.usernameLogin,
            password: this.state.passwordLogin,
        }
        LoginUser(creds).then(res => {
            if(res.ok){
                let token = ''
                res.json().then(data => token=data.token).then(() => localStorage.setItem('token', token))
                this.props.router.navigate('/home')
            }
        });
    }

    onClickRegister(){
        let user = {
            username: this.state.usernameRegister,
            password: this.state.passwordRegister,
            email: this.state.emailRegister
        }
        RegisterUser(user)
        window.location.reload();
    }

    render() {
        if(localStorage.getItem("token") !== null) {
            return <Navigate replace='true' to='/home/'/>
        }
        return (
            <div className="AuthPage">
                <NavbarAuthScreen/>
                <div style={{display: 'flex', minWidth: '100vw', minHeight: '80vh', justifyContent: 'center', alignItems: 'center'}}>
                <Grid container direction='row' justifyContent='center'>
                    <Box
                        component="div"
                        sx={{display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            minWidth: '25vw',
                            maxWidth: '25vw',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '10px',
                            padding: '20px',
                            marginRight: '5vw'
                        }}>
                        <Grid container direction="column" alignItems='center' spacing='2vh'>
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
                    <Box
                        component="div"
                        sx={{display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            minWidth: '25vw',
                            maxWidth: '25vw',
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
                </div>
            </div>
        );
    }
}
function attachRouter(Component) {
    function ComponentWithRouter(props) {
        let navigate = useNavigate(); // class components cannot use the useParams() hook, so we need a wrapping component;

        return (
            <Component
                {...props}  // previous props
                router = {{ navigate }} // router - attached prop;
            />
        );
    }

    return ComponentWithRouter;
}

export default attachRouter(AuthPage);