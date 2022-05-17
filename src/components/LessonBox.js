import React from 'react';
import {Grid, Typography} from "@mui/material";
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
                    maxWidth: {xs: '80vw'},
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
                            {this.props.front}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h4"
                            component="div"
                            fontSize= {{xs: "5vw", md: "2vw"}}
                        >
                            {this.props.back}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="p"
                            component="div"
                            fontSize= {{xs: "5vw", md: "2vw"}}
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