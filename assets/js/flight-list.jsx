//add button to remove alert
var React = require('react')

module.exports = React.createClass({

    handleDelete: function(url) {
        $.ajax({
            url: url,
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + localStorage.flighthound_token
            },
            success: function() {
                console.log('Deleted')
            }
        })
    },

    render: function() {
        if (this.props.user.flights) {
            var flightNodes = this.props.user.flights.map(
                function(flight){
                    return (
                <li key={flight.key}>
                    {flight.origin_iata + ' to ' 
                    + flight.destination_iata + ' on ' 
                    + flight.depart_date +  
                    '. Max price: ' + flight.max_price}
                    <button onClick={this.handleDelete.bind(this, flight.url)}>
                        Delete
                    </button>
                </li>        
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
