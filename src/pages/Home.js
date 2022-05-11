import '../styles/App.css';
import Flashcard from '../components/Flashcard.js';
import FlashcardGrid from '../components/FlashcardGrid';
import React from 'react';
import { HomeMiniRounded } from '@mui/icons-material';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.card1 = new Map();
    this.card1.set('word', 'cuvant');
    this.card1.set('translation', 'word');

    this.card2 = new Map();
    this.card2.set('word', 'apa');
    this.card2.set('translation', 'water');

    this.card3 = new Map();
    this.card3.set('word', 'soare');
    this.card3.set('translation', 'sun');

    this.cards = [this.card1, this.card2, this.card3];
  }

  render() {
    return (
      <div className="Home" style={{display: 'flex', minHeight: '100vh'}}>
        <FlashcardGrid cards={this.cards} />
      </div>
    );
  }
}

export default Home;
