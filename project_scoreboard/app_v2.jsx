var PLAYERS = [
    {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
    },
    {
        name: "Andrew Chalkley",
        score: 35,
        id: 2,
    },
    {
        name: "Alena Hollogan",
        score: 42,
        id: 3,
    },
];

function Header(props) {
    return (
        <div className = "header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired, //require titile to be a string, required, 
}


function Player(props) {
    return (
        <div className = "player">
            <div className = "player-name"> 
                {props.name}
            </div>
            <div className = "player-score"> 
                <Counter initialScore={props.score}/>
            </div>
        </div>
    );
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired, //require titile to be a string, required, 
    score: React.PropTypes.number.isRequired, //require titile to be a number, required, 
}

var Counter = React.createClass({
    propTypes: {
        initialScore: React.PropTypes.number.isRequired,
    },
    getInitialState: function(){
        return {
            score: this.props.initialScore,
        }
    },
    decrementScore: function(e){
        this.setState({
            score: (this.state.score - 1),
        });
    },
    incrementScore: function(e){
        this.setState({
            score: (this.state.score + 1),
        });
    },
    // return a virtual DOM representations for components
    render: function() {
        return (
            <div className = "counter">
                <button className = "counter-action decrement" onClick={this.decrementScore}>-</button>
                <div className = "counter-score">{this.state.score}</div> 
                <button className = "counter-action increment" onClick={this.incrementScore}>+</button>
            </div>
        );
    }
});

//function Counter(props) {
//    return (
//        <div className = "counter">
//            <button className = "counter-action decrement">-</button>
//            <div className = "counter-score">{props.score}</div> 
//            <button className = "counter-action increment">+</button>
//        </div>
//    );
//}

//Counter.propTypes = {
//    score: React.PropTypes.number.isRequired, //require titile to be a number, required, 
//}


function Application (props){
    return (
        <div>
            <div className = "scoreboard">
                <Header title = {props.title} />
                <div className = "players">
                    {props.players.map(function(player) {
                        return <Player name = {player.name} score = {player.score} key = {player.id}/>
                    })}
                    
                </div>
            </div>   
        </div>
    );
}

Application.propTypes = {
    title: React.PropTypes.string.isRequired, //require titile to be a string, required, 
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired,
    })).isRequired,
}

Application.defaultProps = {
    title: "Scoreboard", // if we add default value, then "isRequired" is not necessary
}

ReactDOM.render(<Application title={"My Scoreboard"} players = {PLAYERS}/ >, document.getElementById('container'));
                
//ReactDOM.render(<Application / >, document.getElementById('container'));
// react.js:19368 Warning: Failed propType: Required prop `title` was not specified in `Application`.

// ReactDOM.render(<Application title={3}/ >, document.getElementById('container'));
// react.js:19368 Warning: Failed propType: Invalid prop `title` of type `number` supplied to `Application`, expected `string`.