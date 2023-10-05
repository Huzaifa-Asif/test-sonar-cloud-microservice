var user=require('../models/model.user.js');


// Login
module.exports.login = (email,callback) => {
    user.findOne({email: email}, callback);
}

// Add User 
module.exports.addUser = (userForm ,callback) =>  {
    record=new user();
    record.name=userForm.name;
    record.email=userForm.email;
    record.password=record.hashPassword(userForm.password);
    record.save(callback);
}

// Update User
module.exports.updateUser = async (id, userForm, options, callback) => {
    var query = {_id: id};

    let record=new user();
    if(userForm.password)
    {
        userForm.password=record.hashPassword(userForm.password);
    }
    
    user.findOneAndUpdate(query, userForm, options, callback);
}


