import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '70vw', md: '40vw'},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

class FlashcardModal extends React.Component {
    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Box sx={style}>
                    <Typography variant="p">
                        word:
                    </Typography>
                    <Typography variant="h3">
                        {this.props.front}
                    </Typography>
                    <Divider />
                    <Typography variant="p">
                        translation:
                    </Typography>
                    <Typography variant="h4">
                        {this.props.back}
                    </Typography>
                    <Divider />
                    <Typography variant="p">
                        definition:
                    </Typography>
                    <Typography variant="h6">
                        {this.props.definition}
                    </Typography>
                </Box>
            </Modal>
        );
    }
}

export default FlashcardModal;