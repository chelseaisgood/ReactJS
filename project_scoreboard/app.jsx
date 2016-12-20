function Application (props){
    return (
        <div>
            <div className = "scoreboard">
                <div className = "header">
                    <h1>{props.title}</h1>
                </div>
                <div className = "players">
                    <div className = "player">
                        <div className = "player-name"> 
                            LUCAS DALTRO
                        </div>
                        <div className = "player-score"> 
                            <div className = "counter">
                                <button className = "counter-action decrement">-</button>
                                <div className = "counter-score">25</div> 
                                <button className = "counter-action increment">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className = "player">
                        <div className = "player-name"> 
                            SOME DUDE
                        </div>
                        <div className = "player-score"> 
                            <div className = "counter">
                                <button className = "counter-action decrement">-</button>
                                <div className = "counter-score">33</div> 
                                <button className = "counter-action increment">+</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>   
        </div>
    );
}

ReactDOM.render(<Application title="My Scoreboard"/ >, document.getElementById('container'));