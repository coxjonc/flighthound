var React = require('react')
var FlightCreate = require('./flight-create')
var FlightList = require('./flight-list')
var auth = require('./auth')

module.exports = React.createClass({

    loadUserData: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/1/',
            datatype: 'json',
            headers: {'Authorization': 'Token ' + localStorage.flighthound_token},
            success: function(res) {
                this.setState({data: res})
            }.bind(this)
        })
    },
    
    logOutHandler: function() {
        auth.logout()  
        this.
    },

    getInitialState: function() {
        return {user: null}
    },

    componentDidMount: function() {
        this.loadUserData()
    },

    render: function() {
        return (
            <div>
                <FlightCreate />
                <FlightList user={this.state.user} />
                <p className="logout" onClick={this.logOutHandler}>Log out</p>
            </div>
        )
    }
})


