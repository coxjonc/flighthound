var React = require('react')

module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.flighthound_token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.flighthound_token = res.token
                if (cb) cb(true)
                this.onChange(true)
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
    },        
    
    logout() {
        delete localStorage.flighthound_token
        this.onChange(false)
    },

    loggedIn: function() {
        return !!localStorage.flighthound_token
    },
    onChange: function() {
    },
    getToken: function(username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/api-token-auth/',
            data: {
                username: username,
                password: pass
            },
            success: function(){
                cb({authenticated: true})
            }.bind(this)
        })
    }, 
}
