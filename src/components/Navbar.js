import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {logoutUser} from "../services/AuthService";
import HomeIcon from "@mui/icons-material/Home";
import {IconButton} from "@mui/material";
import {attachRouter} from "../services/CommonService";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    handleLogout(event) {
        logoutUser().then(() => {
            sessionStorage.clear();
            this.props.router.navigate('/');
        });
    }

    handleHome(event) {
        this.props.router.navigate("/home");
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
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
                <Toolbar />
            </Box>
        );
    }
}

export default attachRouter(Navbar);