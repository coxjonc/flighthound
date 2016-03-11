var React = require('react')
require('react-select/dist/react-select.css')
var Select = require('react-select')

module.exports = React.createClass({
    getAirports: function(q) {
        return ( 
            $.ajax({
                url: this.props.url + "?search=" + q,
                datatype: 'json',
                success: function(data) {
                    this.setState({airports:data})
                }.bind(this)
            })
        )
    },
    getInitialState: function() {
        return {airports: []}
    },
    handleChange: function(input, callback) {
        var that = this
        if (input.length==3){
            this.getAirports(input)
            setTimeout(function() {
                airports = that.state.airports.map(function(i){
                    return {value: i.iata, label: i.city + " (" + i.iata + ")"}
                    })
                callback(null, {options: [{value:'cool',label:'nice'},{value:'wow',label:'doge'}]}) 
            }, 500)
        
        }
    },

    render: function() {
        return (
            <Select.Async
                name="from-select"
                loadOptions={this.handleChange}
            />
        )
    }
})
