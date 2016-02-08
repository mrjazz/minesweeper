import React, { Component } from 'react';

export default class GameBtns extends Component {
    render() {
        return <div className="game-btns">
                    <button onClick={this.props.restart}>Restart</button>
                </div>
    }
}