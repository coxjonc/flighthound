var React = require('react')
var FlightCreate = require('./flight-create')
var FlightList = require('./flight-list')

module.exports = React.createClass({
    getToken: function() {
        $.ajax({
            type: 'POST',
            url: '/api/api-token-auth/',
            data: 'username=test&password=test',
            success: function(data){
                this.setState({token: 'Token ' + data.token})
            }.bind(this)
        })
    },
    
    loadUsernameFromServer: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/1/',
            datatype: 'json',
            headers: {'Authorization': this.state.token},
            success: function(data) {
                this.setState({username: data.username})
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {username: '', token: ''}
    },
    componentDidMount: function() {
        var that = this
        this.getToken()
        setTimeout(function() {
            that.loadUsernameFromServer()
        }, 500)
    },
    render: function() {
        return (
            <div>
                <FlightList username={this.state.username}/>
            </div>
        )
    }
})

