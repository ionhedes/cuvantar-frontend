import React from 'react';
import {Grid, Typography} from "@mui/material";
import FlashcardGrid from "../components/FlashcardGrid";
import Navbar from "../components/Navbar";
import {filterFinishedReviews} from "../services/ReviewService";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {isLoggedIn} from "../services/AuthService";

class SummaryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {correct: [], incorrect: []};
    }

    componentDidMount() {

        if (!this.wasCalledWithoutReviews()) {
            filterFinishedReviews(this.props.router.location.state.completedReviews, true).then(cards => {
                this.setState({ correct: cards });
            })
            filterFinishedReviews(this.props.router.location.state.completedReviews, false).then(cards => {
                this.setState({ incorrect: cards });
            })
        }
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
                        <FlashcardGrid cards={this.state.correct}></FlashcardGrid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">Answered incorrectly</Typography>
                    </Grid>
                    <Grid item>
                        <FlashcardGrid cards={this.state.incorrect}></FlashcardGrid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function attachRouter(Component) {
    function ComponentWithRouter(props) {
        let navigate = useNavigate(); // class components cannot use the useParams() hook, so we need a wrapping component;
        let location = useLocation();

        return (
            <Component
                {...props}  // previous props
                router = {{ navigate, location }} // router - attached prop;
            />
        );
    }

    return ComponentWithRouter;
}

export default attachRouter(SummaryPage);