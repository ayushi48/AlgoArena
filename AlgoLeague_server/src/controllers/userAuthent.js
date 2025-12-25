const redisClient = require('../config/redis');
const { findByIdAndUpdate } = require('../model/problem');
const Submission = require('../model/submission');
const User = require('../model/user')
const validate = require('../utils/valitaor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        validate(req.body)

        const { firstName, emailId, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10)
        req.body.role = 'user'
        req.body.problemSolved = []

        const user = await User.create(req.body)

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            plans: user.plans,
            role: user.role
        }
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: 'user' }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 })

        res.status(201).json({
            user: reply,
            message: 'user created successfully'
        })
    } catch (err) {
        res.status(400).send('ERROR: ' + err)
    }
}


const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId) {
            throw new Error("Invalid Credentials")
        }
        if (!password) {
            throw new Error("Invalid Credentials")
        }
        const user = await User.findOne({ emailId })
        if (!user) {
            return res.status(401).send('Invalid Credentials');
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new Error('Invalid Credentials')
        }
        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            plans: user.plans,
            role: user.role
        }
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 })
        res.status(201).json({
            user: reply,
            message: "Logged In Successfully"
        })
    } catch (err) {
        res.status(401).send('ERROR: ' + err)
    }
}

const logout = async (req, res) => {
    try {
        const { token } = req.cookies
        const payload = jwt.decode(token);
        await redisClient.set(`token:${token}`, "Blocked")
        await redisClient.expireAt(`token:${token}`, payload.exp)
        res.cookie("token", null, { expires: new Date(Date.now()) })
        res.status(200).send("Logged Out Succesfully")
    } catch (err) {
        res.status(503).send("ERROR: " + err)
    }
}

const adminRegister = async (req, res) => {
    try {
        validate(req.body)
        const { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10)
        const user = await User.create(req.body)
        res.status(201).send("User Registered Successfully");
    } catch (err) {


        res.status(400).send('ERROR: ' + err)
    }
}

const profileupdate = async (req, res) => {
     try {
        let { id, firstName, lastName, age, emailId, old_password, new_password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(old_password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.body.emailId = user.emailId;
        req.body.role = user.role;
        req.body.plans = user.plans;

        if (new_password) {
            req.body.password = await bcrypt.hash(new_password, 10);
        } else {
            req.body.password = user.password;
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ message: 'Profile updated', user: updatedUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteprofile = async (req, res) => {
    try {
        const userId = req.result._id;
        await User.findByIdAndDelete(userId);
        res.status(200).send("Deleted Successfully")
    } catch (err) {

        res.status(500).send("SERVER ERROR")
    }
}

const deleteuser = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send("User ID is required");
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send("User doesn't exist");
        }

        res.status(200).send("User deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("SERVER ERROR");
    }
};

const alluserdata = async (req, res) => {

    try {
        const users = await User.find({}, '_id firstName lastName role plans');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'SERVER ERROR' });
    }
};

module.exports = { login, register, logout, adminRegister, alluserdata, deleteprofile, deleteuser, profileupdate }
