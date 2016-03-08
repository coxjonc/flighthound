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
                    <input type="radio" value="round-trip" name="foo" 
                        onChange={this.handleChange}
                        checked={'round-trip' === this.state.selectedType} />
                    <input type="radio" value="one-way" name="foo" 
                        onChange={this.handleChange}    
                        checked={'one-way' === this.state.selectedType} />
                </div>
        )
    }
})

