import React from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";

class ReviewBox extends React.Component {
    render() {
        return (
            <Box
                component="div"
                sx={{display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    minWidth: {xs: '80vw', md: '60vw'},
                    backgroundColor: '#e0e0e0',
                    borderRadius: '30px',
                    width: '600px',
                    padding: '20px',
                    textAlign: "center"
                }}
            >
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography
                            variant="h2"
                            component="div"
                            fontSize="10vw"
                        >
                            {this.props.word}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography
                            variant="h4"
                            component="div"
                            fontSize="4vw"
                        >
                            {this.props.translation}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography
                            variant="p"
                            component="div"
                            fontSize="2vw"
                        >
                            {this.props.definition}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default ReviewBox