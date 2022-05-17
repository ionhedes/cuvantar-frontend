import React from 'react';
import Navbar from "../components/Navbar";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Navigate, useNavigate} from "react-router-dom";
import LessonBox from '../components/LessonBox';
import {getLessons} from '../services/LessonService';
import Pagination from '../components/Pagination';

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.lessons = getLessons();
        
        this.state = {value: "", currentLesson: this.lessons[0], todoperPage: 1 };

        this.handleLessonChange = this.handleLessonChange.bind(this);
    }

    isLessonQueueEmpty() {
        return this.lessons.length === 0;
    }

    handleLessonChange(value){
        this.setState({currentLesson: this.lessons[value - 1]});
    }


    render() {

        if(sessionStorage.getItem("token") === null) {
            return <Navigate replace='true' to='/'/>
        }

        let lessonLayout = (
            <Grid container direction="column">
                <Grid item container spacing={5} justifyContent="center" mt="1vh">
                    <Grid item>
                        <LessonBox 
                            word={!this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.front}
                            translation={!this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.back}
                            definition={!this.isLessonQueueEmpty() ?  "" : this.state.currentLesson.definition}
                            onChange={this.handleLessonChange}/>
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
                        fontSize="6vw"
                    >
                        There are no lessons left for you
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

    return attachRouter(ComponentWithRouter);
}

export default LessonsPage;