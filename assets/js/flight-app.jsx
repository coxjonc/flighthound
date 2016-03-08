var React = require('react')
var FlightCreate = require('./flight-create')
var FlightList = require('./flight-list')

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <FlightCreate />
            </div>
        )
    }
})

