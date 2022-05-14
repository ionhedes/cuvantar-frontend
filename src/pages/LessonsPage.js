import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import LessonBox from '../components/LessonBox';
import getLessonsGenerator from '../services/LessonService';
import Pagination from '../components/Pagination';

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.lessonsGenerator = getLessonsGenerator();

        
        this.state = {value: "", currentLesson: this.lessonsGenerator.next(), todoperPage: 1 };

        this.handleChange = this.handleChange.bind(this);
    }

    isLessonQueueEmpty() {
        return this.state.currentLesson.done === true;
    }

    handleChange(event) {
        let nextLesson = this.lessonsGenerator.next();
        this.setState({currentLesson: nextLesson});
    }

    render() {
        let lessonLayout = (
            <Grid container direction="column">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <LessonBox word={this.state.currentLesson.value.word} translation={this.state.currentLesson.value.translation} definition={this.state.currentLesson.value.definition} onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt="1vh">
                    <Grid item  mt="1vh">
                        <Pagination onChange={this.handleChange}/>
                    </Grid>
                    <Grid item>
                        <Link to="/review" style={{ textDecoration: "none" }}>
                            <Button variant="contained">
                                Finish
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        );

        let noLessonLayout = (
            <Grid container direction="column" alignItems="center" mt="1vh">
                <Grid item justifyContent="center">
                    <Typography
                        variant="h2"
                        fontSize="8vw"
                    >
                        No Lessons!
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
                {this.isLessonQueueEmpty() ? noLessonLayout : lessonLayout}
            </div>
        );
    }
}



export default LessonsPage;