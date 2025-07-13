const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const {tokenize, verifyToken} = require("../utility/tokenizer");

const registerUser = async (req, res) => {
    try
    {
        const {name, email, password} = req.body;
        const user = await UserModel.create({name, email, password});
        res.send(user);
    }
    catch(error)
    {
        console.log(`Error while registering user, Error: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try
    {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(404).send({ message: 'User not found' });
        }
        else
        {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(401).send({ message: 'Invalid password' });
            }
            const token = await tokenize({ userId: user._id });
            return res.status(200).send({ message: 'User logged in successfully', user, token });
        }
    }
    catch(error)
    {
        console.log(`Error while logging in user, Error: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}


module.exports = { registerUser, loginUser };