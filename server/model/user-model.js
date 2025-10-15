const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
    },
    email:{
    },
    password:{

    }
})

module.exports = mongoose.model('User',userSchema);