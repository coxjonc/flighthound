var React = require('react')
var TypeInput = require('./type-input')
var FromSelect = require('./from-select')
var ToSelect = require('./to-select')

module.exports = React.createClass({
    getInitialState: function() {
        return {    
            origin_iata: '', 
            destination_iata: '', 
            max_price: 0
        }
    },

    handleFromChange: function(e) {
        this.setState({origin: e.target.value})
    },
    
    handleToChange: function(e) {
        this.setState({destination: e.target.value})
    },

    handlePriceChange: function(e) {
        this.setState({max_price: e.target.value})
    },
    
    handleSubmit: function(e) {
        e.preventDefault()
        var formData = {
            origin_iata: this.state.origin,
            destination_iata: this.state.destination,
            max_price: this.state.max_price
        }
        $.ajax({
            type: 'POST',
            url: '/api/flights/',
            data: JSON.stringify(formData),
        headers: {
            Authorization: 'Token ' + localStorage.flighthound_token
        },
            success: function() {
                console.log('Flight alert created.')
            },
            datatype: 'json',
            contentType: 'application/json'
        })
    },

    updateUser: function() {
    },

    render: function() {
        return (
            <form className="foo" onSubmit={this.handleSubmit}>
            <TypeInput />
            <table>
            <tbody>
                <tr>
                    <td>From: </td>
                    <td><input type="text" onChange={this.handleFromChange} /></td>
                </tr>
                <tr>
                    <td>To: </td>
                    <td><input type="text" onChange={this.handleToChange} /></td>
                </tr>
                <tr>
                    <td>Max price: </td>
                    <td><input type="text" onChange={this.handlePriceChange}/></td>
                </tr>
            </tbody>
            </table>
            <button type="submit" >Create alert</button>
            </form>
        )
    }
})
