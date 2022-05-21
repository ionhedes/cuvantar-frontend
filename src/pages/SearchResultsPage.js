import React from 'react';
import Navbar from "../components/Navbar";
import {isLoggedIn} from "../services/AuthService";
import {getAllFlashcards} from "../services/FlashcardService"
import {Navigate} from "react-router-dom";
import FlashcardGrid from '../components/FlashcardGrid';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {attachRouter} from "../services/CommonService";

// this.props.router.params.cardId

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false, cards: [] };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            getAllFlashcards().then( cards => {
                // const field_to_match = this.props.router.params.side;
                // const matcher = this.props.router.params.keyword;
                // console.log(field_to_match)
                // console.log(matcher)
                // const cards_filtered = cards.filter(card => {
                //     card[field_to_match].includes(matcher);
                // })
                this.setState({ loaded:true, cards: cards });
            })
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
            <div className="SearchResults">
                <Navbar></Navbar>
                <Grid container direction="column" spacing={5} alignItems="center" mb="1vh">
                    <Grid item container spacing={3} justifyContent="center" mt={5}>
                        <Grid item container justifyContent="center">
                            <Typography variant="h4">Search results for {this.props.router.params.cardId}:</Typography>
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

export default attachRouter(SearchResultsPage);