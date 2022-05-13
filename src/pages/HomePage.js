import FlashcardGrid from '../components/FlashcardGrid';
import React from 'react';
import SearchableNavbar from "../components/SearchableNavbar";
import HomepageCard from "../components/HomepageCard";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {getRecentLessonCards} from "../styles/LessonService";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.card1 = new Map();
        this.card1.set('word', 'cuvant');
        this.card1.set('translation', 'word');

        this.card2 = new Map();
        this.card2.set('word', 'apa');
        this.card2.set('translation', 'water');

        this.card3 = new Map();
        this.card3.set('word', 'soare');
        this.card3.set('translation', 'sun');

        this.card4 = new Map();
        this.card4.set('word', 'picior');
        this.card4.set('translation', 'leg');

        this.cards = [ this.card1, this.card2, this.card3, this.card4 ];
    }

    render() {
        return (
            <div className="Home">
                <SearchableNavbar></SearchableNavbar>
                <Grid container direction="column" spacing={5} alignItems="center">
                    <Grid item container spacing={3} justifyContent="center" mt={5}>
                        <Grid item>
                            <HomepageCard name="Lessons" />
                        </Grid>
                        <Grid item>
                            <HomepageCard name="Reviews"/>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Typography variant="h5" component="div">
                            Recently studied words
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FlashcardGrid cards={getRecentLessonCards()} />
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
