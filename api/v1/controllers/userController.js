const {users} = require('../models/userModel');

let getUsers = (req, res) => {
    try {
        res.status(200).json({
        'message': 'modified',
        users
    })  
    } catch (error) {
        res.status(500).json({message:error.message});
    } 
} 

module.exports = {
    getUsers
};