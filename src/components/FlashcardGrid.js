import { Grid } from '@mui/material';
import * as React from 'react';
import Flashcard from "./Flashcard";

class FlashcardGrid extends React.Component {
    render() {
        return <Grid container spacing={4} justifyContent='center' alignContent='center'>
            {this.props.cards.map((card) =>
                <Grid item>
                    <Flashcard word={card.get('word')} translation={card.get('translation')} />
                </Grid>
            )}
        </Grid>;
    }
}

export default FlashcardGrid;