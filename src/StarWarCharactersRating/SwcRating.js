import React, { Component } from 'react';
import SwcFilter from './SwcFilter';
import SwcGrid from './SwcGrid';
import SwcCharDetail from './SwcDetail';
import SwcComments from './SwcComments';
import SwcCollectionFetcher from './services/SwcCollectionFetcher';
import SwcNameFilter from './services/SwcNameFilter';

import './SwcRating.css';

const CHAR_DEFS = {
    votes: 0,
    comments: [],
};

const FETCH_CHARACTERS_URL = 'http://swapi.co/api/people/';

class SwcRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterKeyword: null,
            allChars: null,
            filteredChars: null,
            selectedChar: null,
            loadingError: null,
        }

        this.filterChars = this.filterChars.bind(this);
        this.selectChar = this.selectChar.bind(this);
        this.voteChar = this.voteChar.bind(this);
        this.changeToGridView = this.changeToGridView.bind(this);
        this.updateHomeworld = this.updateHomeworld.bind(this);
        this.addComment = this.addComment.bind(this);
        this.updateCharacters = this.updateCharacters.bind(this);
    }

    filterChars(keyword) {
        const filter = new SwcNameFilter(this.state.allChars);
        this.setState({
            filteredChars: filter.filter(keyword),
            filterKeyword: keyword,
        });
    }

    selectChar(character) {
        this.setState({
            selectedChar: character,
        });
    }

    voteChar(character, voteNum) {
        const char = this.state.allChars.get(character.url);
        char.votes += voteNum;
        this.setState({
            filteredChars: sortCharacter(this.state.filteredChars),
        });
    }

    changeToGridView() {
        this.setState({
            selectedChar: null,
        });
    }

    updateHomeworld(character, homeworld) {
        const char = this.state.allChars.get(character.url);
        char.homeworld = homeworld;
        this.setState({
            filteredChars: [...this.state.filteredChars],
        });
    }

    updateCharacters(allChars) {
        this.setState({
            allChars,
            filteredChars: [...allChars.values()],
        });
    }

    componentDidMount() {
        SwcCollectionFetcher.fetchAllData(FETCH_CHARACTERS_URL, CHAR_DEFS, this.updateCharacters)
            .then(this.updateCharacters)
            .catch(handleError.bind(this));

        function handleError(err) {
            console.error('Loading all characters failed with error: '+err.message);
            this.setState({
                loadingError: err,
            });
        }
    }

    addComment(comment) {
        const char = this.state.allChars.get(this.state.selectedChar.url);
        char.comments = [...char.comments, comment];
        this.setState({
            selectedChar: char,
        });
    }

    render() {

        return this.state.selectedChar ? (
            <div className="rate-body">
                <SwcCharDetail className="char-detail" character={this.state.selectedChar} onGoBack={this.changeToGridView} onCommentAdded={this.addComment}>
                </SwcCharDetail>
                <SwcComments className="char-comment" comments={this.state.selectedChar.comments} onCommentAdded={this.addComment}></SwcComments>
            </div>
        ) : (
            <div className="rate-body">
                <div className="char-filter">
                    <SwcFilter  filterKeyword={this.state.filterKeyword} onFilterTriggered={this.filterChars}>
                    </SwcFilter>
                </div>
                <SwcGrid className="rate-grid" loadingError={this.state.loadingError} filteredChars={this.state.filteredChars} onCharacterSelected={this.selectChar} onVoted={this.voteChar} onHomeworldUpdated={this.updateHomeworld}>
                </SwcGrid>
            </div>
        );
    }
}

function sortCharacter(characters) {
    return characters.sort((char1, char2) => char2.votes - char1.votes);
}

export default SwcRating;

