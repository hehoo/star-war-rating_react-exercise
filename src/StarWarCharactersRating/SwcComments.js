import React, { Component } from 'react';
import './SwcComments.css';

class SwcComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
        };

        this.handleAddComment = this.handleAddComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleAddComment() {
        this.props.onCommentAdded(this.state.comment);
        this.setState({
            comment: '',
        });
    }

    handleChange(evt) {
        this.setState({
            comment: evt.target.value,
        });
    }

    handleKeyPress(evt) {
        if(evt.key === 'Enter') {
            this.handleAddComment();
            evt.preventDefault();
        }
    }

    render() {
        return (
            <div className="comment-area">
                <label htmlFor="add_comment" className="add-name-label">New Comment: </label>
                <input className="input-comments" type="text" name="add_comment" placeholder="Input your comment" value={this.state.comment} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <button className="add-comment-btn" type="button" onClick={this.handleAddComment}>Add</button>
            </div>
        )
    }
}

export default SwcComments