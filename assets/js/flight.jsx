var React = require('react')

module.exports = React.createClass({
    getInitialState: function() {
        return {flight: [], url: this.props.url}
    },

    componentDidMount: function() {
        this.loadFlight()
    },
    
    handleDelete: function() {
        $.ajax({
                type: 'DELETE',
                url: this.state.url,
                headers: {
                    'Authorization': 'Token ' + localStorage.flighthound_token
                } 
            })
    },

    loadFlight: function() {
        $.ajax({
            type: 'GET',
            url: this.state.url,
            datatype: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.flighthound_token
            }, 
            success: function(res) {
                this.setState({flight: res})
            }.bind(this)
        })
    },
    
    render: function() {
        var flight = this.state.flight
        return (
            <li>
            {flight.origin_iata + ' to ' + flight.destination_iata + ' on ' + flight.depart_date +  '. Max price: ' + flight.max_price}
                <button onClick={this.handleDelete}>
                    Delete
                </button>
            </li>        
        )
    }
})
