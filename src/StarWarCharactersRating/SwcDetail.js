import React, { Component } from 'react';
import './SwcDetail.css';

class SwcDetail extends Component {
    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleGoBack() {
        this.props.onGoBack();
    }

    render() {
        const character = this.props.character;
        return (
            <div>
                <div>
                    <button type="button" onClick={this.handleGoBack}> Go Back </button>
                </div>
                <hr/>
                <div>
                    <h3 className="char-name">{character.name}</h3>
                    <table className="detail-table">
                        <tbody>
                            <tr>
                                <th>Height: </th>
                                <td>{character.height}</td>
                            </tr>
                            <tr>
                                <th>Mass: </th>
                                <td>{character.mass}</td>
                            </tr>
                            <tr>
                                <th>Hair Color: </th>
                                <td>{character.hair_color}</td>
                            </tr>
                            <tr>
                                <th>Skin Color: </th>
                                <td>{character.skin_color}</td>
                            </tr>
                            <tr>
                                <th>Eye Color: </th>
                                <td>{character.eye_color}</td>
                            </tr>
                            <tr>
                                <th>Birth Year: </th>
                                <td>{character.birth_year}</td>
                            </tr>
                            <tr>
                                <th>Gender: </th>
                                <td>{character.gender}</td>
                            </tr>
                            <tr>
                                <th>Homeworld: </th>
                                <td>
                                    {character.homeworld.name}
                                </td>
                            </tr>
                            <tr>
                                <th>Films: </th>
                                {genListItems(character.films)}
                            </tr>
                            <tr>
                                <th>Species: </th>
                                {genListItems(character.species)}
                            </tr>
                            <tr>
                                <th>Vehicles: </th>
                                {genListItems(character.vehicles)}
                            </tr>
                            <tr>
                                <th>Starships: </th>
                                {genListItems(character.starships)}
                            </tr>
                            <tr>
                                <th>Created: </th>
                                <td>{character.created}</td>
                            </tr>
                            <tr>
                                <th>Edited: </th>
                                <td>{character.edited}</td>
                            </tr>
                            <tr>
                                <th>URL: </th>
                                <td>{character.url}</td>
                            </tr>
                            <tr>
                                <th>Votes: </th>
                                <td>{character.votes}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Comments: </h2>
                    <div className="comments-list">
                        {character.comments.map((comment, idx) => <div key={idx} className="comment-section">{comment}</div>)}
                    </div>
                </div>
            </div>
        );
    }
}

function genListItems(list) {
    return (
        <td>
            <ul>
                {list.map(item => <li key={item}><a href={item}>{item}</a></li>)}
            </ul>
        </td>
    );
}

export default SwcDetail