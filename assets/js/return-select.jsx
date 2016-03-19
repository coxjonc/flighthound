var React = require('react')
var moment = require('moment')
var DatePicker = require('react-datepicker')

require('react-datepicker/dist/react-datepicker.css')

module.exports = React.createClass({
    getInitialState: function() {
        return {
            startDate: moment()
        }
    },

    handleChange: function(date) {
        this.setState({
            startDate: date
        })
    },

    render: function() {
        return (
            <td>
                <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange} 
                disabled={!this.props.roundTrip}/>
            </td>
        )
    }
})
