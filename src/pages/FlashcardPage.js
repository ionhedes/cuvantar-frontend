import React from 'react';
import {Typography} from "@mui/material";
import {attachRouter} from "../services/CommonService";

class StaticFlashcardPage extends React.Component {
    render() {
        return (
            <Typography variant="h1">Flashcard page for {this.props.router.params.cardId}</Typography>
        );
    }
}

export default attachRouter(StaticFlashcardPage);