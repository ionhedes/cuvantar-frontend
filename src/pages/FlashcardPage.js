import React from 'react';
import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";

class StaticFlashcardPage extends React.Component {
    render() {
        return (
            <Typography variant="h1">Flashcard page for {this.props.router.params.cardId}</Typography>
        );
    }
}

function attachRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams(); // class components cannot use the useParams() hook, so we need a wrapping component;

        return (
            <Component
                {...props}  // previous props
                router = {{ params }} // router - attached prop; {params} - object literal of a
            />
        );
    }

    return ComponentWithRouter;
}

export default attachRouter(StaticFlashcardPage);