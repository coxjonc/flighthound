var React = require('react')

module.exports = {
    login: function(username, pass) {
        this.getToken(username, pass)
    },        

    loggedIn: function() {
        return !!localStorage.flighthound_token
    },

    getToken: function(username, pass) {
        $.ajax({
            type: 'POST',
            url: '/api/api-token-auth/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                localStorage.flighthound_token = res.token
            }.bind(this)
        })
    }, 
}
