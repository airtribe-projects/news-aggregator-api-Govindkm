const jwt = require('jsonwebtoken');

const tokenize = async(data) => {
    try{
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h'});
        return token;
    }
    catch(error){
        console.error(`Error while generating token: ${error}`);
        throw new Error('Token generation failed');
    }
}

const verifyToken = async(token) => {
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch(error){
        console.error(`Error while verifying token: ${error}`);
        throw new Error('Token verification failed');
    }
}

module.exports = { tokenize, verifyToken };