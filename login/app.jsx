var LoginForm = React.createClass({
    
    propTypes: {
        title: React.PropTypes.string.isRequired, //require title to be a string, required, 
        source: React.PropTypes.string.isRequired,      
    },
    
    getDefaultProps: function(){
        return{
            title: "WELCOME",
        };
    },
    
    getInitialState: function() {
      return {
        username: '',
        password: '',
        errors: {}
      };
    },
    
    onUserNameChange: function(e) {
        this.setState({username: e.target.value});
    },
    
    onPasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    
//    componentDidMount: function() {
//      this.serverRequest = $.get(this.props.source, function (result) {
//        var lastGist = result[0];
//        this.setState({
//          username: lastGist.owner.login,
//          lastGistUrl: lastGist.html_url
//        });
//      }.bind(this));
//    },
//
//    componentWillUnmount: function() {
//      this.serverRequest.abort();
//    },
    
    
    onSubmit: function (e) {
        console.log('login requested');
        e.preventDefault();
        var errors = this.onValidate();
        if(Object.keys(errors).length != 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        var xhr = this.onLogin();
        xhr.done(this._onSuccess)
        .fail(this._onError)
        .always(this.hideLoading)
    },
    
    onValidate: function () {
        var errors = {}
        if(this.state.username == "") {
            errors.username = "Username is required";
        }
        if(this.state.password == "") {
            errors.password = "Password is required";
        }
        return errors;
    },
    
    onLogin: function () {
        return $.ajax({
            url: this.props.source,
            type: 'POST',
            headers: { 'Access-Control-Allow-Origin': '*' },
            crossDomain: true,
            dataType: "jsonp", 
            data: {
                username: this.state.username,
                password: this.state.password,
            },
            success: function () { alert('it works') },
            error: function() {alert('it doesnt work')},
//            beforeSend: function () {
//                this.setState({loading: true});
//            }.bind(this)
        })
    },
    
//    onSubmit: function(e) {
//        console.log('onScoreChange');
////        e.preventDefault();
////        this.props.onAdd(this.state.name);
////        this.setState({name: ""});
//    },
    // return a virtual DOM representations for components
    render: function() {
        return (
        <form className="loginForm">
            <p>{this.props.title}</p>
            <input type="text" placeholder="User Name" name="user" id="login_user" value={this.state.username} onChange={this.onUserNameChange} />
            <input type="password" placeholder="Password" name="pwd" id="login_pwd"  value={this.state.password} onChange={this.onPasswordChange}/>
            <button id="login-button" class="button" type="button" value="Login In" onClick={this.onSubmit}>Login In</button>
        </form>
        );
    }
});

ReactDOM.render(<LoginForm title={"Edu.chat"} source="http://bot.edu.chat:8080/alpha.edu.chat/api/login"/ >, document.getElementById('container'));
