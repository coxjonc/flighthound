var React = require('react')
var auth = require('./auth')

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

            const { location }= this.props

            if (location.state && location.state.nextPathname) { 
                this.context.router.replace(location.state.nextPathname)
            } else {
                this.context.router.replace('/dashboard/')
            }
        })
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                <tbody>
                    <tr>
                        <td><input placeholder='username' ref='username'/></td>
                    </tr>
                    <tr>
                        <td><input placeholder='password' ref='pass'/></td>
                    </tr>
                </tbody>
                </table>
                <button type='submit'>login</button>
            </form>
        )
    }
})
