function uid() {
    if (uid.id == undefined) uid.id = 1;
    return uid.id++;
}

function range(n) {
    var result = []
    for(var i = 0; i < n; i++) result.push(i);
    return result;
}

var Cell = React.createClass({
    getInitialState: function() {
        return {value: 0}
    },
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value;
    },
    click: function(e) {        
        this.props.cellClick(this.props.x, this.props.y)
    },
    render: function() {
        var tag = this.props.value; 
        switch(this.props.value) {
            case 0:
                tag = "";
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
});

var Area = React.createClass({
    getInitialState: function() {
        return {game: Game.init()};
    },
    cellClick: function(x, y) {        
        var result = Game.shoot(this.state.game, x, y);        
        var map = result[1];
        console.log(result[0])
        if(result[0] == "fail") {
            map = Game.showMines(map)
        }
        this.setState({game: map});            
    },
    render: function() {
        var map = this.state.game;
        var cellClick = this.cellClick;

        function rows(j) {
            return range(10).map(function (i) {
                return <Cell key={i} x={i} y={j} value={map[j][i]} cellClick={cellClick}/>;
            })
        }

        var html = range(10).map(function (i) {
            return <tr key={i}>{rows(i)}</tr>;
        })

        return <table className="area"><tbody>{html}</tbody></table>;
    }
});

ReactDOM.render(
    <Area/>,
    document.getElementById("content")
);
