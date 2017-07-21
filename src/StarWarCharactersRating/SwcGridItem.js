import React, { Component } from 'react';
import SwcCharOverview from './SwcOverview';
import SwcCharVote from './SwcVote';
import './SwcGridItem.css';

class SwcGridItem extends Component {
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
        this.handleCharSelection = this.handleCharSelection.bind(this);
        this.handleHomeworldUpdated = this.handleHomeworldUpdated.bind(this);
    }

    handleVote(voteNum) {
        this.props.onVoted(this.props.character, voteNum);
    }

    handleCharSelection() {
        this.props.onCharacterSelected(this.props.character);
    }

    handleHomeworldUpdated(character, homeworld) {
        this.props.onHomeworldUpdated(character, homeworld);
    }

    render() {
        return (
            <div className="grid-item">
                <SwcCharOverview character={this.props.character} onCharacterSelected={this.handleCharSelection} onHomeworldUpdated={this.handleHomeworldUpdated}></SwcCharOverview>
                <SwcCharVote votes={this.props.character.votes} onVoted={this.handleVote}></SwcCharVote>
            </div>
        );
    }
}

export default SwcGridItem