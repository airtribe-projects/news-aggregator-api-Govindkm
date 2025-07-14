const { verifyToken } = require('../utility/tokenizer');
const authenticate = async (req, res, next) => {
    try {
        const splitted = req.headers.authorization?.split(' ');
        const token = splitted.length > 1 ? splitted[1] : splitted[0];
        if (!token) {
            return res.status(401).send({ message: 'Access denied, no token provided' });
        }
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(`Authentication error: ${error}`);
        return res.status(401).send({ message: 'Invalid token' });
    }
}

module.exports = {authenticate};