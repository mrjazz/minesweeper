import React, { Component } from 'react';
import Game from '../api/game.js';

import GameArea from './GameArea.jsx';
import GameBtns from './GameBtns.jsx';
import GameStatus from './GameStatus.jsx';


export default class GameUI extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }

    handleCellClick = (x, y) => {
        var result = Game.shoot(this.state.game, x, y);
        var map = result[1];
        var status = Number.isInteger(result[0]) ? 'play' : result[0];
        console.log(result[0], status);
        if(result[0] == 'fail') {
           map = Game.showMines(map);
        }
        this.setState({game: map, status: status});
    };

    restart = (event) => {
        this.setState(this.getInitState());
    };

    getInitState() {
        return {game: Game.init(), status: 'play'}
    }

    render() {
        var game_area;
        switch (this.state.status) {
            case 'fail':
                game_area = <GameStatus message="You Loose"/>
                break;
            case 'win':
                game_area = <GameStatus message="You Win"/>
                break;
            default:
                game_area = <GameArea map={this.state.game} onCellClick={this.handleCellClick}/>
        }
        return <div>
            {game_area}
            <GameBtns restart={this.restart}/>
        </div>
    }
}
