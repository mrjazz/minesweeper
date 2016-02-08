import React, { Component } from 'react';
import Cell from './Cell.jsx';

function range(n = 10) {
    return Array(n)
        .fill()
        .map((i, j) => j);
}

export default class GameArea extends Component {
    render() {
        const map = this.props.map;
        let cellClick = this.props.onCellClick;

        const html = range()
            .map(i => <tr key={i}>{
                range().map((j) => <Cell key={j} x={i} y={j} value={map[j][i]} cellClick={cellClick}/>)
            }</tr>);

        return <table className="area"><tbody>{html}</tbody></table>
    }
}