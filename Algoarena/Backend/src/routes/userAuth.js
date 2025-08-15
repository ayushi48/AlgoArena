const express = require('express')


const authRouter = express.Router();
const { register, login, logout, adminRegister, deleteprofile } = require("../controllers/userAuthent");
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//register
authRouter.post('/register', register);
//login
authRouter.post('/login', login);
//logout
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register', adminMiddleware, adminRegister)
authRouter.delete('/deleteprofile', userMiddleware, deleteprofile)
authRouter.get('/check', userMiddleware, (req, res) => {
    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id: req.result._id,
        role:req.result.role
    }
    res.status(200).json({
        user: reply,
        message: "Valid User"
    })
})

//getProfile
// authRouter.get('getProfile',getProfile)

module.exports = authRouter;