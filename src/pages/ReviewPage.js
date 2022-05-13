import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ReviewBox from "../components/ReviewBox";
import getReviewGenerator from "../services/ReviewService";
import {Link, useNavigate} from "react-router-dom";

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);

        this.reviewGenerator = getReviewGenerator();
        this.answers = [];
        this.state = {value: "", currentReview: this.reviewGenerator.next() , answers: []};

        this.handleChange = this.handleChange.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
    }

    isReviewQueueEmpty() {
        return this.state.currentReview.done === true;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    sendAnswer(event) {
        this.answers = this.answers.concat(this.state.value === this.state.currentReview.value.answer);

        let nextReview = this.reviewGenerator.next();
        if (nextReview.done === true) {
            alert("answers " + this.answers);
            this.props.router.navigate("/summary");
        } else {
            this.setState({currentReview: nextReview});
        }
    }

    render() {
        let reviewLayout = (
            <Grid container direction="column">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <ReviewBox word={this.state.currentReview.value.word} onChange={this.handleChange}/>
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
                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <Button variant="contained">
                                Finish session
                            </Button>
                        </Link>
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
                {this.isReviewQueueEmpty() ? noReviewLayout : reviewLayout}
            </div>
        );
    }
}

function attachRouter(Component) {
    function ComponentWithRouter(props) {
        let navigate = useNavigate(); // class components cannot use the useParams() hook, so we need a wrapping component;

        return (
            <Component
                {...props}  // previous props
                router = {{ navigate }} // router - attached prop;
            />
        );
    }

    return ComponentWithRouter;
}

export default attachRouter(ReviewPage);
