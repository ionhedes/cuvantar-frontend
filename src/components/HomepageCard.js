import * as React from 'react';
import {CardActionArea, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import {Link} from "react-router-dom";

class HomepageCard extends React.Component {
    render() {
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Link to={this.props.destination} style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" component="div">
                                    {this.props.name}
                                </Typography>
                            </Link>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        );

    }
}

export default HomepageCard;