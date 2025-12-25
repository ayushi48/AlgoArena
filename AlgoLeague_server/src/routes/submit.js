const express =require('express')
const submitRouter = express.Router()
const userMiddleware = require('../middleware/userMiddleware')
const {submitCode, runCode} = require('../controllers/userSubmission')
const submitCodeRateLimiter = require('../middleware/CodeRateLimiter')

submitRouter.post("/submit/:id",userMiddleware,submitCodeRateLimiter,submitCode)
submitRouter.post("/run/:id",userMiddleware,submitCodeRateLimiter,runCode)

module.exports = submitRouter
