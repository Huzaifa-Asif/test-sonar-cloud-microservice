const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

// User Schema

const userSchema = new schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },


})
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

const user = module.exports = mongoose.model('User', userSchema);