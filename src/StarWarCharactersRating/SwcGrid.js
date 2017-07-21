import React, { Component } from 'react';
import SwcGridItem from './SwcGridItem';
import './SwcGrid.css';

class SwcGrid extends Component {
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
        this.handleCharSelection = this.handleCharSelection.bind(this);
        this.handleHomeworldUpdated = this.handleHomeworldUpdated.bind(this);
    }

    handleVote(character, voteNum) {
        this.props.onVoted(character, voteNum);
    }

    handleCharSelection(character) {
        this.props.onCharacterSelected(character);
    }

    handleHomeworldUpdated(character, homeworld) {
        this.props.onHomeworldUpdated(character, homeworld);
    }

    render() {
        const filteredChars = this.props.filteredChars;
        const loadingError = this.props.loadingError;
        let gridItems = <span className="loading">Loading...</span>;
        if(filteredChars) {
            gridItems = filteredChars.map(genSwcGridItem.bind(this));
        } else if(loadingError) {
            gridItems = <span className="error">Oops, loading failed with error: {loadingError.message}</span>
        }
        return (
            <div className="grid">
                {gridItems}
            </div>
        );

        function genSwcGridItem(character) {
            return <SwcGridItem className="item" character={character} onCharacterSelected={this.handleCharSelection} onVoted={this.handleVote} onHomeworldUpdated={this.handleHomeworldUpdated} key={character.url}></SwcGridItem>;
        }
    }
}

export default SwcGrid