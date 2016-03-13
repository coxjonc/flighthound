var React = require('react')
var ReactDOM = require('react-dom')
var FlightApp = require('./flight-app')
var Router = require('react-router')
var Login = require('./login')
var auth = require('./auth')

function requireAuth(nextState, replace) {
    if (!auth.loggedIn())
        replace({ 
            pathname:'/app/login/',
            state: {nextPathname: nextState.location.pathname}
        })
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/app/login/' component={Login} />
        <Router.Route path='/app/dashboard/' component={FlightApp} onEnter={requireAuth} />
    </Router.Router>,
    document.getElementById('app')    
)
