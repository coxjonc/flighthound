var React = require('react')
var TypeInput = require('./type-input')
var FromSelect = require('./from-select')

module.exports = React.createClass({
    render: function() {
        return (
            <form name="foo">
                <TypeInput />
                <FromSelect url='/airports'/>
            </form>
        )
    }
})
