import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {logoutUser} from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {IconButton} from "@mui/material";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    handleLogout(event) {
        logoutUser().then(res => {
            if (res.ok) {
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("token");

                if (sessionStorage.getItem("lessons")) {
                    sessionStorage.removeItem("lessons");
                }
                if (sessionStorage.getItem("reviews")) {
                    sessionStorage.removeItem("reviews");
                }

                this.props.router.navigate('/')
            }
        });
    }

    handleHome(event) {
        this.props.router.navigate("/home");
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={this.handleHome}
                        >
                            <HomeIcon/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'block', sm: 'block' } }}
                        >
                            Cuvântar
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', whiteSpace: "nowrap" }}>
                            <Button variant="contained"
                                    color="error"
                                    onClick={this.handleLogout}
                            >
                                Log out
                            </Button>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
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

export default attachRouter(Navbar);