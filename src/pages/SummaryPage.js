import React from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import SearchableNavbar from "../components/SearchableNavbar";
import FlashcardGrid from "../components/FlashcardGrid";
import {getAnsweredCorrectly, getAnsweredIncorrectly} from "../services/ReviewService.";

class SummaryPage extends React.Component {
    render() {
        return (
            <div className="SummaryPage">
                <SearchableNavbar />
                <Grid container direction="column" alignItems="center" mt="1vh">
                    <Grid item>
                        <Typography variant="h3">Answered correctly</Typography>
                    </Grid>
                    <Grid item>
                        <FlashcardGrid cards={getAnsweredCorrectly()}></FlashcardGrid>
                    </Grid>
                    <Grid item>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">Answered incorrectly</Typography>
                    </Grid>
                    <Grid item>
                        <FlashcardGrid cards={getAnsweredIncorrectly()}></FlashcardGrid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SummaryPage;