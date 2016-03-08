var React = require('react')
var Select = require('react-select')

module.exports = React.createClass({
    loadAirportsFromServer: function(e) {
        alert('hey there')
        if (e.currentTargasdfaset.value.length === 3) {
            alert('hi')
            $.ajax({
                url: this.props.url + '?search' + e.currentTarget.value + '/',
                datatype: 'json',
                success: function(data) {
                    this.setState({airports:data})
                }.bind(this)
            })
        }
    },
    
    getInitialState: function() {
        return {airports:[]}
    },

    logChange: function(val) {
        console.log('Selected: ' + val);
    },

    render: function(){
        if (this.state.airports) {
            return (
                <Select
                    name="from-select"
                    options={this.state.airports}
                    onChange={alert('hi')}
                />
            )
        }
    }
})
