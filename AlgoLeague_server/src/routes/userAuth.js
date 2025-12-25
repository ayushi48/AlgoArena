const express = require('express')


const authRouter = express.Router();
const { register, login, logout, adminRegister, deleteprofile,deleteuser ,alluserdata,profileupdate} = require("../controllers/userAuthent");
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
authRouter.delete('/deleteuser/:id', adminMiddleware, deleteuser)
authRouter.put('/profileupdate',userMiddleware,profileupdate)
authRouter.get('/get-all-details',adminMiddleware,alluserdata)
authRouter.get('/check', userMiddleware, (req, res) => {
    const reply = {
        firstName: req.result.firstName,
        lastName: req.result.lastName,
        age: req.result.age,
        emailId: req.result.emailId,
        _id: req.result._id,
        role:req.result.role,
        plans:req.result.plans
        
    }
    res.status(200).json({
        user: reply,
        message: "Valid User"
    })
})



module.exports = authRouter;
