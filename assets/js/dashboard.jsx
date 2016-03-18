var React = require('react')
var FlightCreate = require('./flight-create')
var FlightList = require('./flight-list')
var auth = require('./auth')

module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout()
        this.context.router.replace('/login/')
    },
    
    loadUserData: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/i/',
            datatype: 'json',
            headers: {'Authorization': 'Token ' + localStorage.flighthound_token},
            success: function(res) {
                this.setState({user: res})
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {user: null}
    },

    componentDidMount: function() {
        this.loadUserData()
        setInterval(this.loadUserData, 2000)
        FlightCreate.updateUser = this.updateUser
    },

    updateUser: function() {
        console.log('user updated')
        this.loadUserData()
    },

    render: function() {
        return (
            <div>
                {(this.state.user) ? this.state.user.username : ''}
                <FlightCreate />
                <h2>Your flight alerts</h2>
                <FlightList user={this.state.user} />
                <button className="logout" onClick={this.logoutHandler}>Log out</button>
            </div>
        )
    }
})


