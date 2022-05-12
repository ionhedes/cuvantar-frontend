import * as React from 'react';
import {CardActionArea, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";

class HomepageCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        alert("M-ai apasat.");
    }

    render() {
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card>
                    <CardActionArea
                        onClick={this.handleOnClick}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {this.props.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        );

    }
}

export default HomepageCard;