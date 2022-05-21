import React from 'react';
import Navbar from "../components/Navbar";
import {isLoggedIn} from "../services/AuthService";
import {Navigate} from "react-router-dom";
import FlashcardGrid from '../components/FlashcardGrid';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {convertReviewsToCards} from "../services/ReviewService";
import {fetchMostRecentLessonsFromServer} from "../services/LessonService";

class StudiedFlashcardsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false, cards: [] };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            fetchMostRecentLessonsFromServer().then(
                reviews => convertReviewsToCards(reviews).then(
                    cards => {
                        this.setState({ loaded:true, cards: cards });
                    }
                )
            )
        }
    }

    areRecentCardsLoaded() {
        return this.state.loaded;
    }

    render() {
        if (!isLoggedIn()) {
            return <Navigate replace='true' to='/'/>
        }

        return (
            <div className="AllFlashcards">
                <Navbar></Navbar>
                <Grid container direction="column" spacing={5} alignItems="center" mb="1vh">
                    <Grid item container spacing={3} justifyContent="center" mt={5}>
                        <Grid item container justifyContent="center">
                            <Typography variant="h4">All flashcards you have studied:</Typography>
                        </Grid>
                        <Grid item>
                            { this.areRecentCardsLoaded() ? (<FlashcardGrid cards={this.state.cards} />) : (<CircularProgress />) }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default StudiedFlashcardsPage;