import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import './SwcFilter.css';

class SwcFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterKeyword: this.props.filterKeyword || '',
        }

        this.handleFilter = this.handleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.throttledFilter = debounce(this.handleFilter, 250);
    }

    handleFilter() {
        this.props.onFilterTriggered(this.state.filterKeyword);
    }

    handleChange(evt) {
        this.setState({
            filterKeyword: evt.target.value,
        });
        this.throttledFilter();
    }

    render() {
        return (
            <div>
                <label>
                    <input className="char-filter" type="text" value={this.state.filterKeyword} placeholder="Input your keyword to filter" aria-label="Input keyword to filter" onChange={this.handleChange}/>
                </label>
            </div>
        )
    }
}

export default SwcFilter