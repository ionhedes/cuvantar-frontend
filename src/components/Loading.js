import {CircularProgress, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <Grid container direction="column" alignItems="center" mt="1vh">
                <Grid item justifyContent="center">
                    <CircularProgress />
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt='1vh'>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Button variant="contained">
                            Go back home
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

export default Loading;