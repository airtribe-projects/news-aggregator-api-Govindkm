const {Router} = require('express');
const { registerUser, loginUser } = require('../controller/loginController');

const userRegistrationRouter = Router();

userRegistrationRouter.post('/signup', registerUser);
userRegistrationRouter.post('/login', loginUser);

module.exports = userRegistrationRouter;