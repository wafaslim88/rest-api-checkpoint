const mongoose = require ("mongoose")
const schema = mongoose.Schema

// Define the User schema
const UserSchema = new schema ({
    name : {type:String},
    email : {type:String},
    phone : {type:Number}
})

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;