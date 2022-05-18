import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

class Flashcard extends React.Component {
    render() {
        return (
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                     <CardContent>
                          <Typography variant="h5" component="div">
                              {this.props.front}
                          </Typography>
                          <Typography variant="p" component="div">
                              {this.props.back}
                          </Typography>
                     </CardContent>
                     <CardActions>
                         <Button
                             onClick={() => this.props.onClick(this.props.idx)}
                         >
                             See details
                         </Button>
                     </CardActions>
                </Card>
            </Box>
          );
    }
}

export default Flashcard;