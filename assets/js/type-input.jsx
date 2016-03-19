var React = require('react')

module.exports = React.createClass({
    getInitialState: function() {
        return {selectedType: 'round-trip'}
    },
    handleChange: function(e) {
        this.setState({
            selectedType: e.currentTarget.value   
        })
    },
    render: function() {
        return (
                <div>
                    <label>Round trip</label>
                    <input type="radio" 
                        value='round-trip'
                        onChange={this.handleChange}
                        checked={'round-trip' === this.state.selectedType} />
                    <label>One-way</label>
                    <input type="radio"  
                        value='one-way'
                        onChange={this.handleChange}    
                        checked={'one-way' === this.state.selectedType} />
                </div>
        )
    }
})

