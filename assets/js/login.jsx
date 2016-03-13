var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    handleSubmit: function(e) {
        e.preventDefault()
        var username = this.refs.username.value
        var pass = this.refs.pass.value
        auth.login(username, pass)
        
        var location = this.props
        
        if (location.state && location.state.nextPathname) { 
            this.context.router.replace(location.state.nextPathname)
        } else {
            this.context.router.replace('/app/dashboard/')
        }
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tr>
                        <td><input placeholder='username' ref='username'/></td>
                    </tr>
                    <tr>
                        <td><input placeholder='password' ref='pass'/></td>
                    </tr>
                </table>
                <button type='submit'>login</button>
            </form>
        )
    }
})
