var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;
var api = require("./api.js");
var History = ReactRouter.History;

var Request = React.createClass({

    contextTypes: {
        location: React.PropTypes.object
    },

    mixins: [ History ],

    request: function(event) {
        // prevent default browser submit
        event.preventDefault();
        // get data from form
        var btitle = this.refs.booktitle.value;
        var cnumber = this.refs.coursenumber.value;
        if (!btitle || !cnumber) {
            return;
        }
        
        api.addRequest(btitle, cnumber, function(loggedIn) {

          if (!loggedIn)
            this.history.pushState(null, '/login');
          else
            this.history.pushState(null, '/dashboard');
        }.bind(this));


        this.refs.booktitle.value = '';
        this.refs.coursenumber.value = '';
    },


    render: function() {
        return (
            <div className='content'>
      <div className='center' style={{width:300}}>
           
                <h2> Request a Textbook: </h2>
                <form className="form-vertical" onSubmit={this.request}>
                <input type="text" placeholder="Book Title" style = {{width:500}} ref="booktitle" autoFocus={true} />
                <br/><br/>
                <input type="text" placeholder="Course Number" style = {{width:500}} ref="coursenumber"/>
                <br/><br/>
                <input className="btn btn-warning" type="submit" value="Request" />
                </form>

            </div>
            </div>

            );
    }

    

});

module.exports = Request;
