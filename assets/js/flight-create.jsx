var React = require('react')
var TypeInput = require('./type-input')
var FromSelect = require('./from-select')
var ToSelect = require('./to-select')
var DepartSelect = require('./depart-select')
var ReturnSelect = require('./return-select')
var DatePicker = require('react-datepicker')
var moment = require('moment')

require('react-datepicker/dist/react-datepicker.css')
require('bootstrap-webpack')

module.exports = React.createClass({
    getInitialState: function() {
        return {    
            errorMessage: '',
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
            console.log('type changed')
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
            error: function(xhr, status, err) {
                this.setState({errorMessage: err})
            }.bind(this), 
            datatype: 'json',
            contentType: 'application/json'
        })
    },

    updateUser: function() {
    },

    render: function() {
        return (
            <div>
            <form className="flight-create" onSubmit={this.handleSubmit}>
                <div className="btn-group" data-toggle="buttons">
                    <label className="btn btn-primary">
                        <input type="radio" 
                            autocomplete="off"
                            onClick={this.handleTypeChange}
                            checked={this.state.RoundTrip === true}
                            name="type">
                                Round-trip
                        </input>
                    </label>
                    <label className="btn btn-primary">
                        <input 
                            type="radio"
                            autocomplete="off" 
                            checked={this.state.RoundTrip === false}
                            onClick={this.handleTypeChange}
                            name="type">
                                One-way
                        </input>
                    </label>
                </div>
                <fieldset className="form-group">
                    <label htmlFor="from">From (IATA)</label>
                    <input 
                        type="text" 
                        id="from"
                        className="form-control"
                        onChange={this.handleFromChange} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="to">To (IATA)</label>
                    <input 
                        type="text" 
                        id="from"
                        className="form-control"
                        onChange={this.handleToChange} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="depart">Departure date</label>
                    <DepartSelect onChange={this.handleDepartDateChange} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="return">Return date</label>
                    <ReturnSelect onChange={this.handleReturnDateChange} roundTrip={this.state.roundTrip}/>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="text" 
                        id="price"
                        className="form-control"
                        onChange={this.handlePriceChange} />
                </fieldset>
                <button type="submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}>Create alert</button>
            </form>
            <span>{(this.state.errorMessage) ? 'Invalid request' : ''}</span>
            </div>
        )
    }
})
