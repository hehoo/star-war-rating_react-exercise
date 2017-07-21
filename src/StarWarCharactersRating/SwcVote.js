import React, { Component } from 'react';
import './SwcVote.css';

class SwcVote extends Component {
    constructor(props) {
        super(props);

        this.handleVoteUp = this.handleVoteUp.bind(this);
        this.handleVoteDown = this.handleVoteDown.bind(this);
    }

    handleVoteUp() {
        this.props.onVoted(1);
    }

    handleVoteDown() {
        this.props.onVoted(-1);
    }

    render() {
        return (
            <div className="vote">
                <span className="badge" aria-label="The amount of votes">{this.props.votes}</span>
                <button type="button" onClick={this.handleVoteUp}>Up</button>
                <button type="button" onClick={this.handleVoteDown}>Down</button>
            </div>
        );
    }
}

export default SwcVote