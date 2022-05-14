import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

class NavbarAuthScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: "flex", minWidth: "100vw", justifyContent: "center" }}
                        >Cuvântar
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default NavbarAuthScreen;