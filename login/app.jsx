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
        errors: {},
        token: '',
      };
    },
    
    onUserNameChange: function(e) {
        this.setState({username: e.target.value});
    },
    
    onPasswordChange: function(e) {
        this.setState({password: e.target.value});
    },    
    
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
        this.onLogin();
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
            type: "POST",
//            headers: { 'Access-Control-Allow-Origin': '*',
//                       'Access-Control-Allow-Methods': 'POST',
//                       'Access-Control-Max-Age': '1000',
//                       'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'},
            crossDomain: true,
            dataType: "json", 
            contentType: "application/json",
            data: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            }),
            success: function (msg) {//On Successful service call   
                console.log(msg);
                
                switch (msg.success) {
                    case true:
                        alert('true');
                        this.state.token = msg.token;
                        break;
                    case false:
                        this.state.password = '';
                        this.setState({password: this.state.password});
                        alert(msg.reason);
                        break;
                    default:
                        alert('undefined');
                        break;
                };
            }.bind(this),
            error: function (xhr) { 
                console.log(xhr.responseText); 
                alert('it doesnt work');
            }, 
        })
    },
    
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

ReactDOM.render(<LoginForm title={"Edu.chat"} source="https://alpha.edu.chat/api/login"/ >, document.getElementById('container'));
