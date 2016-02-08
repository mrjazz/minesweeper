import React, { Component } from 'react';

export default class GameStatus extends Component {
    render() {
        return <div className="status">
                <h1>{this.props.message}</h1>
            </div>
    }
}