const {users} = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        res.status(200).json({
        status: 'success',
        message: 'Users Found',
        users
    })  
    } catch (error) {
        res.status(500).json({message:error.message});
    } 
} 

const createUser = async (req, res) => {
    try {
        const user = await req.body;

        if (!user) {
            res.status(404).json({
                status: 'Failed',
                message: 'No content found'
            })
        }
        
        users.push(user);
        res.status(201).json({
            status: 'success',
            message: 'User Created',
            user
        })

    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error.message
        })
    }
};
module.exports = {
    getUsers,
    createUser
};