import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value;
    }

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
        return <td key={this.props.key} onClick={() => this.props.cellClick(this.props.x, this.props.y)}>{tag}</td>
    }
}