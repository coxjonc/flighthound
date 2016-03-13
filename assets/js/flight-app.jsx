var React = require('react')
var FlightCreate = require('./flight-create')
var FlightList = require('./flight-list')

module.exports = React.createClass({
    
    loadUserData: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/1/',
            datatype: 'json',
            headers: {'Authorization': 'Token ' + localStorage.flighthound_token},
            success: function(res) {
                this.setState({username: res.username})
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {
            username: ''
        }
    },

    componentWillMount: function() {
        this.loadUserData()
    },

    render: function() {
        return (
            <div>
                <FlightCreate />
                <FlightList />
            </div>
        )
    }
})

