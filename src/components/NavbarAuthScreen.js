import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

class NavbarAuthScreen extends React.Component {

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
                        >
                            Cuvântar
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </Box>
        );
    }
}

export default NavbarAuthScreen;