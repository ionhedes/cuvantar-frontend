import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import LessonBox from '../components/LessonBox';
import {getLessons} from '../services/LessonService';
import Pagination from '../components/Pagination';

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.lessons = getLessons();

        
        this.state = {value: "", currentLesson: this.lessons[0], todoperPage: 1 };

        this.handleChange = this.handleChange.bind(this);
        this.handleLessonChange = this.handleLessonChange.bind(this);
    }

    isLessonQueueEmpty() {
        return this.lessons.length === 0;
    }

    handleChange(event) {
        let nextLesson = this.lessonsGenerator.next();
        this.setState({currentLesson: nextLesson});
    }

    handleLessonChange(value){
        this.setState({currentLesson: this.lessons[value -1]});
    }


    render() {
        let lessonLayout = (
            <Grid container direction="column">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <LessonBox 
                            word={this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.word} 
                            translation={this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.translation}
                            definition={this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.definition} onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="center" mt="1vh">
                    <Grid item  mt="1vh">
                        <Pagination onChange={this.handleLessonChange
                } />
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