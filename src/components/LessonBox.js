import React from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";

class ReviewBox extends React.Component {
    render() {
        return ( 
            this.props.map((card) => 
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
                <Grid container direction="column" alignItems="center" spacing={5}>
                    <Grid item>
                        <Typography
                            variant="h2"
                            component="div"
                            fontSize="10vw"
                        >
                            {card.word}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography
                            variant="h4"
                            component="div"
                            fontSize="4vw"
                        >
                            {card.translation}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography
                            variant="p"
                            component="div"
                            fontSize="2vw"
                        >
                            {card.definition}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            )
        );
    }
}

export default ReviewBox