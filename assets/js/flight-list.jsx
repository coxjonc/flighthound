var React = require('react')
var Flight = require('./flight')

module.exports = React.createClass({
    
    render: function() {
        if (this.props.user != null) {
            var flightNodes = this.props.user.flights.map(
                function(flight){
                    return <Flight url={flight} />
                }) 
            return (
                <ul> 
                    {flightNodes}
                </ul>
            )
        } else {
            return <div> You have created no flight alerts yet </div>
        }
    }
})
