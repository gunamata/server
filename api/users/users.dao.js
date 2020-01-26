var mongoose = require('mongoose');
var usersSchema = require('./users.model');

usersSchema.statics = {
    create : function(data, cb) {
        var user = new this(data);
        user.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },
    getUUID: function(query, cb) {
        this.find(query, cb).select({ "_id": 1});
    },    
    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var usersModel = mongoose.model('users', usersSchema);
module.exports = usersModel;