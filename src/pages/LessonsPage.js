import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Navigate} from "react-router-dom";
import LessonBox from '../components/LessonBox';
import {fetchLessonsFromServer, finishLessonSession} from '../services/LessonService';
import Pagination from '../components/Pagination';
import {isLoggedIn} from "../services/AuthService";
import {attachRouter} from "../services/CommonService";
import Loading from "../components/Loading";

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.lessons = { length: 0 };
        
        this.state = { loaded: false, value: "", currentLesson: { front: "", back: "", definition: "" } };

        this.handleLessonChange = this.handleLessonChange.bind(this);
        this.finishLessons = this.finishLessons.bind(this);
    }

    componentDidMount() {
        if (isLoggedIn()) {
            fetchLessonsFromServer().then(
                lessons => {

                    if (sessionStorage.getItem("sessionExpired")) {
                        sessionStorage.clear();
                        this.props.router.navigate("/");
                    }

                    this.lessons = lessons;
                    this.setState({ loaded: true});
                    if (!this.isLessonQueueEmpty()) {
                        this.setState({ currentLesson: this.lessons[0] });
                    }
                }
            )
        }
    }

    isLessonQueueEmpty() {
        return this.lessons === [] || this.lessons === null || this.lessons.length === 0;
    }

    areLessonsLoaded() {
        return this.state.loaded;
    }

    handleLessonChange(value){
        this.setState({currentLesson: this.lessons[value - 1]});
    }

    finishLessons() {
        finishLessonSession();
        if (sessionStorage.getItem("sessionExpired")) {
            sessionStorage.clear();
            this.props.router.navigate("/");
        }
        this.props.router.navigate("/home");
    }

    render() {

        if(!isLoggedIn()) {
            return <Navigate replace='true' to='/'/>
        }

        let lessonLayout = (
            <Grid container direction="column" mb="1vh">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <LessonBox
                            front={this.state.currentLesson.front}
                            back={this.state.currentLesson.back}
                            definition={this.state.currentLesson.definition}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt="1vh">
                    <Grid item  mt="1vh">
                        <Pagination count={this.lessons.length} onChange={this.handleLessonChange} />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={this.finishLessons}
                        >
                            Finish
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );

        let noLessonLayout = (
            <Grid container direction="column" alignItems="center" mt="1vh">
                <Grid item justifyContent="center">
                    <Typography
                        variant="h2"
                        fontSize="6vw"
                    >
                        No lessons left!
                    </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt='1vh'>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"

                        >
                            Go back home
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )

        return (
            <div className="LessonsPage">
                <Navbar />
                {
                    this.areLessonsLoaded() ?
                        this.isLessonQueueEmpty() ? noLessonLayout : lessonLayout
                        : (<Loading />)
                }
            </div>
        );
    }
}

export default attachRouter(LessonsPage);
