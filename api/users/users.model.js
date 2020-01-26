var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrementModelID = require('../counter/counter.model');
var usersSchema = new Schema({    
    id: { 
    	type: Number, 
    	unique: true, 
    	min: 1 
    },
    firstname :{
        type: String,
        unique : false,
        required : true
    },
    lastname :{
        type: String,
        unique : false,
        required : true
    },    
    email : {
        type: String,
        unique : true,
        required : true
    }
}, {
    timestamps: true
});

usersSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('users', this, next);
});

module.exports = usersSchema;