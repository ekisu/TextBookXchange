var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var auth = require("./auth.js");

// Register page, shows the registration form and redirects to the list if login is successful
var Register = React.createClass({
  // mixin for navigation
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  // handle regiser button submit
  register: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var name = this.refs.name.value;
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var email = this.refs.email.value;
    if (!name || !username || !password || !email || username.indexOf(' ') >= 0) {
       return 
    }
    // register via the API
    auth.register(name, username, password, email, function(loggedIn) {
      // register callback
      if (!loggedIn)
        return this.setState({
          error: true
        });
      this.history.pushState(null, '/dashboard');
    }.bind(this));
  },

  // show the registration form
  render: function() {
    return (
      <div className='content'>
      <div className='center' style={{width:150}}>
        <h2>Register</h2>
        <form className="form-vertical" onSubmit={this.register}>
          <input type="text" placeholder="Name" ref="name" style={{width:400}}autoFocus={true} />
          <br/><br/>
          <input type="text" placeholder="Username" style={{width:400}}ref="username"/>
          <br/><br/>
          <input type="password" placeholder="Password" style={{width:400}}ref="password"/>
          <br/><br/>
          <input type="email" placeholder="Email" style={{width:400}}ref="email"/>
          <br/><br/>
          <input className="btn btn-warning" type="submit" value="Register" />

          {this.state.error ? (
             <div className="alert">Invalid username or password.</div>
           ) : null }
        </form>
        </div>
      </div>
    );
  }
});

module.exports = Register;
