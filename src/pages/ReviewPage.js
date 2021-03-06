import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ReviewBox from "../components/ReviewBox";
import {convertReviewsToCards, fetchReviewsFromServer, sendReviewResults} from "../services/ReviewService";
import {Link, Navigate} from "react-router-dom";
import {attachRouter, createGenerator} from "../services/CommonService";
import {isLoggedIn} from "../services/AuthService";
import Loading from "../components/Loading";

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);

        this.reviewGenerator = {};
        this.state = { loaded: false, value: "", currentReview: {value: {front: "", back: ""}, done: true}, answers: [] };
        this.answers = [];

        this.handleTypeAnswer = this.handleTypeAnswer.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.finishReviews = this.finishReviews.bind(this);
    }

    componentDidMount() {
        if (isLoggedIn()) {
            fetchReviewsFromServer().then(
                reviews => {

                    if (sessionStorage.getItem("sessionExpired")) {
                        sessionStorage.clear();
                        this.props.router.navigate("/");
                    }

                    convertReviewsToCards(reviews).then(
                        cards => {
                            this.reviewGenerator = createGenerator(cards);
                            this.setState({loaded: true, currentReview: this.reviewGenerator.next()});
                        }
                    )
                }
            )
        }
    }

    isReviewQueueEmpty() {
        return this.state.currentReview.done === true;
    }

    areReviewsLoaded() {
        return this.state.loaded;
    }

    handleTypeAnswer(event) {
        this.setState({value: event.target.value});
    }

    sendAnswer(event) {
        this.answers = this.answers.concat(this.state.value === this.state.currentReview.value.back);

        let nextReview = this.reviewGenerator.next();
        if (nextReview.done === true) {
            this.finishReviews();
        } else {
            this.setState({currentReview: nextReview});
        }
    }

    finishReviews(event) {
        const completedReviews = sendReviewResults(this.answers);
        if (sessionStorage.getItem("sessionExpired")) {
            sessionStorage.clear();
            this.props.router.navigate("/");
        }
        this.props.router.navigate("/summary", { state: { completedReviews } });
    }

    render() {

        if (!isLoggedIn()) {
            return <Navigate replace='true' to='/'/>
        }

        let reviewLayout = (
            <Grid container direction="column">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <ReviewBox word={!this.isReviewQueueEmpty() ? this.state.currentReview.value.front : ""} onChange={this.handleTypeAnswer}/>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt="1vh">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={this.sendAnswer}
                        >
                            Send answer
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={this.finishReviews}
                        >
                            Finish session
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );

        let noReviewLayout = (
            <Grid container direction="column" alignItems="center" mt="1vh">
                <Grid item justifyContent="center">
                    <Typography
                        variant="h2"
                        fontSize="8vw"
                    >
                        No reviews!
                    </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt='1vh'>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Button variant="contained">
                            Go back home
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )

        return (
            <div className="ReviewPage">
                <Navbar />
                {
                    this.areReviewsLoaded() ?
                        this.isReviewQueueEmpty() ? noReviewLayout : reviewLayout
                        : (<Loading />)
                }
            </div>
        );
    }
}

export default attachRouter(ReviewPage);
