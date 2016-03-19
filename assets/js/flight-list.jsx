//add button to remove alert
var React = require('react')
var Flight = require('./flight')

module.exports = React.createClass({

    handleDelete: function(url) {
        $.ajax({
                type: 'DELETE',
                url: url,
                headers: {
                    'Authorization': 'Token ' + localStorage.flighthound_token
                } 
            })
    },
    
    render: function() {
        if (this.props.user != null) {
            var flightNodes = this.props.user.flights.map(
                function(flight, i){
                    return (
                        <div>
                        <Flight url={flight} key={i} />
                        <button onClick={this.handleDelete(flight)}>Delete</button>
                        </div>
                        )
                }.bind(this)) 
            return (
                <ul> 
                    {flightNodes}
                </ul>
            )
        } else {
            return <div> You have created no flight alerts yet </div>
        }
    }
})
