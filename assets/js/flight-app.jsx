var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var Dashboard = require('./dashboard')
var Login = require('./login')
var auth = require('./auth')

require('bootstrap-webpack')

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/app/login/',
            state: {nextPathname: '/app/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/app/login/' component={Login} />
        <Router.Route path='/app/' component={Dashboard} onEnter={requireAuth} />
    </Router.Router>,
    document.getElementById('app')    
)
