import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Navigate, useNavigate} from "react-router-dom";
import LessonBox from '../components/LessonBox';
import {finishLessonSession, getLessons} from '../services/LessonService';
import Pagination from '../components/Pagination';
import {isLoggedIn} from "../services/AuthService";

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.lessons = { length: 0 };
        
        this.state = { value: "", currentLesson: { front: "", back: "", definition: "" } };

        this.handleLessonChange = this.handleLessonChange.bind(this);
        this.finishLessons = this.finishLessons.bind(this);
    }

    componentDidMount() {
        getLessons().then(lessons => {
            this.lessons = lessons;
            if (!this.isLessonQueueEmpty()) {
                this.setState({currentLesson: this.lessons[0]});
            }
        });
    }

    isLessonQueueEmpty() {
        return this.lessons === [] || this.lessons === null || this.lessons.length === 0;
    }

    handleLessonChange(value){
        this.setState({currentLesson: this.lessons[value - 1]});
        console.log(this.state.currentLesson);
    }

    finishLessons() {
        finishLessonSession();
        this.props.router.navigate("/home");
    }

    render() {

        if(!isLoggedIn()) {
            return <Navigate replace='true' to='/'/>
        }

        let lessonLayout = (
            <Grid container direction="column">
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
                        There are no lessons left for you
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
                {this.isLessonQueueEmpty() ? noLessonLayout : lessonLayout}
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

export default attachRouter(LessonsPage);
