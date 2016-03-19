var React = require('react')
var TypeInput = require('./type-input')
var FromSelect = require('./from-select')
var ToSelect = require('./to-select')
var DepartSelect = require('./depart-select')
var ReturnSelect = require('./return-select')
var DatePicker = require('react-datepicker')
var moment = require('moment')

require('react-datepicker/dist/react-datepicker.css')

module.exports = React.createClass({
    getInitialState: function() {
        return {    
            origin: '', 
            destination: '', 
            departDate: moment(),
            returnDate: moment(),
            maxPrice: 0,
            roundTrip: true
        }
    },

    handleTypeChange: function() {
        this.setState({
            roundTrip: !this.state.roundTrip   
        })
    },

    handleFromChange: function(e) {
        this.setState({origin: e.target.value})
    },
    
    handleDepartDateChange: function(e) {
        this.setState({
            departDate: e
        })
    },

    handleReturnDateChange: function(e) {
        this.setState({
            returnDate: e
        })
    },
    handleToChange: function(e) {
        this.setState({destination: e.target.value})
    },

    handlePriceChange: function(e) {
        this.setState({maxPrice: e.target.value})
    },
    
    handleSubmit: function(e) {
        e.preventDefault()
        var formData = {
            origin_iata: this.state.origin,
            destination_iata: this.state.destination,
            depart_date: this.state.departDate.format('YYYY-MM-DD'),
            return_date: this.state.returnDate.format('YYYY-MM-DD'),
            max_price: this.state.maxPrice
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
            <form className="flight-create" onSubmit={this.handleSubmit}>
                <label>Round trip</label>
                <input type="radio" 
                    onChange={this.handleTypeChange}
                    checked={this.state.roundTrip === true} />
                <label>One-way</label>
                <input type="radio"  
                    onChange={this.handleTypeChange}    
                    checked={this.state.roundTrip === false} />
                <table>
                <tbody>
                    <tr>
                        <td>From (IATA code): </td>
                        <td><input type="text" onChange={this.handleFromChange} /></td>
                    </tr>
                    <tr>
                        <td>To (IATA code): </td>
                        <td><input type="text" onChange={this.handleToChange} /></td>
                    </tr>
                    <tr>
                        <td>Departure Date: </td>
                        <td><DatePicker
                            selected={this.state.departDate}
                            onChange={this.handleDepartDateChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Return Date: </td>
                        <td><DatePicker
                            selected={this.state.returnDate}
                            onChange={this.handleReturnDateChange}
                            disabled={!this.state.roundTrip} />
                        </td>
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
