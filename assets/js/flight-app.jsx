var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var Dashboard = require('./dashboard')
var Login = require('./login')
var auth = require('./auth')

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

    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/login/',
            state: {nextPathname: '/dashboard/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/' component={FlightApp}>
            <Router.Route path='login/' component={Login} />
            <Router.Route path='dashboard/' component={Dashboard} onEnter={requireAuth} />
        </Router.Route>
    </Router.Router>,
    document.getElementById('app')    
)
