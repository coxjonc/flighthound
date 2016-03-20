var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var Dashboard = require('./dashboard')
var Login = require('./login')
var auth = require('./auth')

require('bootstrap-webpack')

var FlightApp = React.createClass({
    
    getInitialState: function() {
        return {
            loggedIn: auth.loggedIn()
        }
    },
    
    updateAuth: function(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        })
    },

    componentDidMount: function() {
        auth.onChange = this.updateAuth
    },

    render: function() {
        return (
            <div>
            <nav className="navbar navbar-inverse"></nav>
                {this.props.children}
            </div>
        )
    }
})

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/app/login/',
            state: {nextPathname: '/app/dashboard/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/app/' component={FlightApp}>
            <Router.Route path='login/' component={Login} />
            <Router.Route path='dashboard/' component={Dashboard} onEnter={requireAuth} />
        </Router.Route>
    </Router.Router>,
    document.getElementById('app')    
)
