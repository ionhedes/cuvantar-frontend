import React from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import FlashcardGrid from "../components/FlashcardGrid";
import Navbar from "../components/Navbar";
import {filterFinishedReviews} from "../services/ReviewService";
import {Navigate} from "react-router-dom";
import {isLoggedIn} from "../services/AuthService";
import {attachRouter} from "../services/CommonService";

class SummaryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loadedCorrectCards: false, loadedIncorrectCards: false, correctCards: [], incorrectCards: [] };
    }

    componentDidMount() {

        if (!this.wasCalledWithoutReviews()) {
            filterFinishedReviews(this.props.router.location.state.completedReviews, true).then(cards => {
                this.setState({ loadedCorrectCards: true, correct: cards });
            })
            filterFinishedReviews(this.props.router.location.state.completedReviews, false).then(cards => {
                this.setState({ loadedIncorrectCards: true, incorrect: cards });
            })
        }
    }

    areCorrectCardsLoaded() {
        return this.state.loadedCorrectCards;
    }

    areIncorrectCardsLoaded() {
        return this.state.loadedIncorrectCards;
    }

    wasCalledWithoutReviews() {
        return !this.props.router.location.state
    }

    render() {

        if (!isLoggedIn() || this.wasCalledWithoutReviews()) {
            return <Navigate replace='true' to='/'/>;
        }

        return (
            <div className="SummaryPage">
                <Navbar />
                <Grid container direction="column" alignItems="center" mt="1vh">
                    <Grid item>
                        <Typography variant="h3">Answered correctly</Typography>
                    </Grid>
                    <Grid item>
                        { this.areCorrectCardsLoaded() ? (<FlashcardGrid cards={this.state.correct} />) : (<CircularProgress />) }
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">Answered incorrectly</Typography>
                    </Grid>
                    <Grid item>
                        { this.areIncorrectCardsLoaded() ? (<FlashcardGrid cards={this.state.incorrect} />) : (<CircularProgress />) }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default attachRouter(SummaryPage);