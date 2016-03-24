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
        this.context.router.replace('/app/login/')
    },
    
    loadUserData: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/i/',
            datatype: 'json',
            headers: {'Authorization': 'Token ' + localStorage.flighthound_token},
            success: function(res) {
                this.setState({data: res})
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: {}}
    },

    componentDidMount: function() {
        this.loadUserData()
        //setInterval(this.loadUserData, 2000)
    },

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            Flighthound {(this.state.data.username) ? '['+this.state.data.username +']': ''}
                        </div>
                        <button type="button" 
                            className="btn btn-default navbar-btn"
                            onClick={this.logoutHandler}>Log out</button>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">Create Flight Alert</div>
                                <div className="panel-body">
                                    <FlightCreate />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">Your Flight Alerts</div>
                                <div className="panel-body">
                                    <FlightList user={this.state.data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


