import {Grid} from '@mui/material';
import * as React from 'react';
import Flashcard from "./Flashcard";
import Box from "@mui/material/Box";
import FlashcardModal from "./FlashcardModal";

class FlashcardGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            modalFlashcardFront: "",
            modalFlashcardBack: "",
            modalFlashcardDefinition: ""
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.checkIfOpen = this.checkIfOpen.bind(this);
    }

    handleOpenModal(cardIdx) {
        this.setState({
            open: true,
            modalFlashcardFront: this.props.cards[cardIdx].front,
            modalFlashcardBack: this.props.cards[cardIdx].back,
            modalFlashcardDefinition: this.props.cards[cardIdx].definition
        });
    }

    handleCloseModal() {
        this.setState( {open: false} );
    }

    checkIfOpen() {
        return this.state.open === true;
    }

    render() {
        return (
            <div className="FlashcardGrid">
                <FlashcardModal
                    open={this.state.open}
                    onClose={this.handleCloseModal}
                    front={this.state.modalFlashcardFront}
                    back={this.state.modalFlashcardBack}
                    definition={this.state.modalFlashcardDefinition}
                />
                <Box
                    component="div"
                    sx={{display: "flex",
                        minWidth: {xs: '80vw', md: '60vw'},
                        maxWidth: '80vw',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '10px',
                        padding: '20px',

                    }}
                >
                    <Grid container spacing={4} justifyContent='center' alignContent='center' minHeight="100">
                        {this.props.cards.map((card, idx) =>
                            <Grid item key={idx}>
                                <Flashcard
                                    idx={idx}
                                    front={card.front}
                                    back={card.back}
                                    onClick={this.handleOpenModal}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default FlashcardGrid;