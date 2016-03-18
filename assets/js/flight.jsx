var React = require('react')

module.exports = React.createClass({
    getInitialState: function() {
        return {flight: []}
    },

    componentDidMount: function() {
        this.loadFlight()
    },

    loadFlight: function() {
        $.ajax({
            type: 'GET',
            url: this.props.url,
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
           <li>{flight.from_iata + ' to ' + flight.to_iata + ' on ' + flight.depart_date}</li>        
        )
    }
})
