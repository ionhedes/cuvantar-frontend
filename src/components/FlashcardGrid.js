import { Grid } from '@mui/material';
import * as React from 'react';
import Flashcard from "./Flashcard";
import Box from "@mui/material/Box";

class FlashcardGrid extends React.Component {
    render() {
        return (
            <Box
                component="div"
                sx={{display: "flex",
                    minWidth: {xs: '80vw', md: '60vw'},
                    maxWidth: '80vw',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '10px',
                    padding: '20px',

                }}
            >
                <Grid container spacing={4} justifyContent='center' alignContent='center' minHeight="100">
                    {this.props.cards.map((card) =>
                        <Grid item>
                            <Flashcard word={card.word} translation={card.translation} />
                        </Grid>
                    )}
                </Grid>
            </Box>

        );
    }
}

export default FlashcardGrid;