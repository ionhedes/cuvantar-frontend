import FlashcardGrid from '../components/FlashcardGrid';
import React from 'react';
import SearchableNavbar from "../components/SearchableNavbar";
import HomepageCard from "../components/HomepageCard";
import {CircularProgress, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Navigate} from "react-router-dom";
import {isLoggedIn} from "../services/AuthService";
import {convertReviewsToCards} from "../services/ReviewService";
import {fetchMostRecentLessonsFromServer} from "../services/LessonService";
import {attachRouter} from "../services/CommonService";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false, cards: [] };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            fetchMostRecentLessonsFromServer().then(
                reviews => {
                    if (sessionStorage.getItem("sessionExpired")) {
                        sessionStorage.clear();
                        this.props.router.navigate("/");
                    }

                    convertReviewsToCards(reviews).then(
                        cards => {
                            this.setState({ loaded:true, cards: cards });
                        }
                    )
                }
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
            <div className="Home">
                <SearchableNavbar></SearchableNavbar>
                <Grid container direction="column" spacing={5} alignItems="center" mb="1vh">
                    <Grid item container spacing={3} justifyContent="center" mt={5}>
                        <Grid item>
                            <HomepageCard name="Lessons" destination="/lessons" />
                        </Grid>
                        <Grid item>
                            <HomepageCard name="Reviews" destination="/review"/>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Typography variant="h5" component="div">
                            Recently studied words
                        </Typography>
                    </Grid>
                    <Grid item>
                        { this.areRecentCardsLoaded() ? (<FlashcardGrid cards={this.state.cards} />) : (<CircularProgress />) }
                    </Grid>
                    <Grid item container spacing={2} justifyContent="center">
                        <Grid item>
                            <Link to="/cards" style={{ textDecoration: 'none' }}>
                                <Button variant="contained">See studied cards</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/cards" style={{ textDecoration: 'none' }}>
                                <Button variant="contained">See all cards</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
    );
    }
}

export default attachRouter(HomePage);
