const request = require('request');
var Users = require('./users.dao');
var properties = require('../../config/properties');

exports.createUser = function (req, res, next) {
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    };

    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json(users)
    })
}

exports.getUser = function(req, res, next) {
    Users.get({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        }
	    request(properties.TONE_PREDICTOR_URL,  (error, response, body) => {
		if(error) {
		    // If there is an error, tell the user 
		    res.json({
			user: user
		    })
		}
		// Otherwise do something with the API data and send a response
		else {
		    res.json({
			user: user,
			biography_tone: body
		    })	    
		}
	    });        
    })
}

exports.getUUID = function(req, res, next) {
    Users.getUUID({email: req.params.email}, function(err, user) {
        var uuid = user._id
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            uuid: user
        })
    })
}

exports.updateUser = function(req, res, next) {
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }
    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}