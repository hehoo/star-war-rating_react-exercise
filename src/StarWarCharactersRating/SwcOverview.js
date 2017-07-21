import React, { Component } from 'react';
import isString from 'lodash/isString';

import './SwcOverview.css';
import SwcSingleDataFetcher from './services/SwcSingleDataFetcher';

class SwcOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingError: null,
        }

        this.handleCharSelection = this.handleCharSelection.bind(this);
    }

    handleCharSelection(evt) {
        evt.preventDefault();
        this.props.onCharacterSelected();
    }

    componentDidMount() {
        if(isURL(this.props.character.homeworld)) {
            SwcSingleDataFetcher.fetch(this.props.character.homeworld)
                .then(homeworld => this.props.onHomeworldUpdated(this.props.character, homeworld))
                .catch(err => {
                    console.error("Loading homeworld failed with error: " + err.message);
                    this.setState({
                        loadingError: err,
                    });
                });
        }
    }

    render() {
        return (
            <a role="button" className="thumbnail" onClick={this.handleCharSelection}>
                <img src="/img/char_placeholder_icon.jpg" alt="{this.props.character.name}"/>
                <div className="caption">
                    <p>{this.props.character.name}</p>
                    <p>{isURL(this.props.character.homeworld) ?  'Loading...' : this.props.character.homeworld.name}</p>
                    {this.state.loadingError ? <p className="error">Loading homeworld failed</p> : ''}
                </div>
            </a>
        );
    }
}

function isURL(val) {
    return isString(val) &&  val.toLowerCase().trim().startsWith('http');
}

export default SwcOverview