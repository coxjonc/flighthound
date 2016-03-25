var React = require('react')
var auth = require('./auth')

require('bootstrap-webpack')

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            error: false
        }
    },

    handleSubmit: function(e) {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        auth.login(username, pass, (loggedIn) => {
            if (!loggedIn) 
                return this.setState({error:true})

        this.context.router.replace('/app/')
        })
    },

    render: function() {
        return (
            <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        Flighthound
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                <div className="panel panel-default">
                    <div className="panel-heading">Login</div>
                    <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset className="form-group">
                            <label htmlFor="inputUsername">Username</label>    
                            <input placeholder="username" 
                                className="form-control" 
                                id="inputUsername" 
                                type="text" 
                                ref="username"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input 
                                placeholder="password" 
                                className="form-control"
                                id="inputPassword" 
                                type="password" 
                                ref="pass"/>
                        </fieldset>
                        <button type="submit" 
                        className="btn btn-primary" 
                        onClick={this.handleSubmit}>Login</button>
                    </form>
                    </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
})
