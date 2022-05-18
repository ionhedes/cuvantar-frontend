import FlashcardGrid from '../components/FlashcardGrid';
import React from 'react';
import SearchableNavbar from "../components/SearchableNavbar";
import HomepageCard from "../components/HomepageCard";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {getRecentLessonCards} from "../styles/LessonService";
import {isLoggedIn} from "../services/AuthService";
import {convertReviewsToCards, fetchReviewsFromServer} from "../services/ReviewService";
import {createGenerator} from "../services/CommonService";
import {fetchMostRecentLessonsFromServer} from "../services/LessonService";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { cards: [] };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            fetchMostRecentLessonsFromServer().then(
                reviews => convertReviewsToCards(reviews).then(
                    cards => {
                        this.setState({cards: cards});
                    }
                )
            )
        }
    }

    render() {
        return (
            <div className="Home">
                <SearchableNavbar></SearchableNavbar>
                <Grid container direction="column" spacing={5} alignItems="center">
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
                        <FlashcardGrid cards={this.state.cards} />
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

export default HomePage;
