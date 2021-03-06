var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var Link = ReactRouter.Link;
var api = require("./api.js");


var BookRequest = React.createClass({

	contextTypes: {
        location: React.PropTypes.object
    },

    mixins: [ History ],

	getInitialState: function() {
		return({
			found : 0
		})
	},

	componentDidMount: function() {
        api.getBooks(this.listSet);        
    },

  // callback for getting the list of items, sets the list state
  listSet: function(status, data) {
      // set the state for the list of items
      if(status){
          this.setState({
            items: data.items,
          
          });
          this.findMatches();
      }
  },

	findMatches: function() {
		for(var i = 0; i < this.state.items.length; i++)
		{
			if(this.state.items[i].title == this.props.title)
			{
				this.setState({
					found : 1
				});
			}
			if(this.state.items[i].courseNumber == this.props.course)
			{
				this.setState({
					found : 1
				});
			}
		}
	},

	
	deleteRequest: function() {
		api.deleteRequest(this.props, function(loggedIn) {
      //login callback

      if (!loggedIn)
        this.history.pushState(null, '/login');
      else
      {
      	this.history.pushState(null, '/login');
      	this.history.pushState(null, '/dashboard');
      }
        
    }.bind(this));
		
	},

	render: function() {
  	var requestitem = {
	    width: 200,
	    minHeight: 150,
	    padding: '15px',
	    borderRadius: 30,
	    borderColor: this.state.found?'#DE703C':'transparent',
	    borderWidth: '7px',
	    borderStyle: 'dotted',
	    backgroundColor: '#FBB040',
	    textAlign:'center',
	    display: 'inline-block',
	    margin: '15px 30px',
	    verticalAlign: 'top'
	}

    return (
    		<div style={requestitem}>
    				<p>   
    				<strong>Title: </strong>{this.props.title}	
    				<br/>
    				<strong>Course Number: </strong>{this.props.course} 
    				<br />
    				<em>{this.state.found?"Item is in Catalog":"Item is not available"}</em>

    				<br/>

					</p>
	    			<div className = "btn btn-danger" type="remove" value="Remove" onClick={this.deleteRequest} >Remove</div>
    				
    			</div>

    	);
		}
	});

	module.exports = BookRequest;