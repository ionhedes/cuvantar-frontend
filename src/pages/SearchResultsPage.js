import React from 'react';
import Navbar from "../components/Navbar";
import {isLoggedIn} from "../services/AuthService";
import {getAllFlashcards} from "../services/FlashcardService"
import {Navigate} from "react-router-dom";
import FlashcardGrid from '../components/FlashcardGrid';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {attachRouter} from "../services/CommonService";

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false, cards: [] };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            getAllFlashcards().then( cards => {
                const side = this.props.router.params.side;
                const matcher = this.props.router.params.matcher;
                const cards_filtered = cards.filter(function (card) {
                    return card[side].toLowerCase().includes(matcher.toLowerCase())
                });
                this.setState({ loaded:true, cards: cards_filtered });
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
                <Navbar/>
                <Grid container direction="column" spacing={5} alignItems="center" mb="1vh">
                    <Grid item container spacing={3} justifyContent="center" mt={5}>
                        <Grid item container justifyContent="center">
                            <Typography variant="h4">Search results for '{this.props.router.params.matcher}' ({this.props.router.params.side} side):</Typography>
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