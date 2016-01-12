import React, { Component } from 'react';
import Game from '../game.js';

function uid() {
    if (uid.id === undefined) {
        uid.id = 1;
    }
    uid.id += 1;
    return uid.id;
}

function range(n) {
    var i, result = [];
    for (i = 0; i < n; i++) {
        result.push(i);
    }
    return result;
}

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value;
    }
    
    click = () => {
        this.props.cellClick(this.props.x, this.props.y);
    };
    
    render() {
        var tag = this.props.value;
        switch (this.props.value) {
        case 0:
                tag = '';
                break;
            case -1:
            case 9:
                tag = <img src="img/nothing.png"/>
                break;
            case 10:
                tag = <img src="img/mine.png"/>
                break;
            case 1:
                tag = <span className="one">1</span>
                break;
            case 2:
                tag = <span className="two">2</span>
                break;
            case 3:
                tag = <span className="three">3</span>
                break;
        }
        return <td key={uid()} onClick={this.click}>{tag}</td>
    }
}

class GameBtns extends Component {    
    render() {
        return <div className="game-btns">
                    <button onClick={this.props.restart}>Restart</button>
                </div>
    }
}

var GameArea = React.createClass({
    render: function () {
        var map = this.props.map;
        var cellClick = this.props.cellClick;

        function rows(j) {
            return range(10).map(function (i) {
                return <Cell key={i} x={i} y={j} value={map[j][i]} cellClick={cellClick}/>;
            })
        }

        var html = range(10).map(function (i) {
            return <tr key={i}>{rows(i)}</tr>;
        })

        return <table className="area"><tbody>{html}</tbody></table>
    }
});


export default class GameUI extends Component {	
    constructor(props) {
        super(props);
        this.state = {game: Game.init()};        
    }	

    cellClick = (x, y) => {        
        var result = Game.shoot(this.state.game, x, y);
        var map = result[1];
        console.log(result[0]);
        if(result[0] == "fail") {
            map = Game.showMines(map);
        }
        this.setState({game: map});
    };
    
    restart = (event) => {
        this.setState({game: Game.init()});
    };
        
    render() {
        return <div>
                <GameArea map={this.state.game} cellClick={this.cellClick}/>
                <GameBtns restart={this.restart}/>
            </div>
    }

}