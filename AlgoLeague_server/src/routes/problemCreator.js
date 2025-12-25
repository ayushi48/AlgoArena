const express = require('express');
const Problem = require('../model/problem');
const adminMiddleware = require('../middleware/adminMiddleware');
const {createProblem, updateProblem,deleteProblem,getProblemById,getAllproblem,solvedAllProblemByUser,submittedProblem} = require('../controllers/userProblem');
const userMiddleware = require('../middleware/userMiddleware');
const problemRouter = express.Router();

problemRouter.post('/create',adminMiddleware,createProblem)
problemRouter.put("/update/:id",adminMiddleware,updateProblem)
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem)

problemRouter.get('/problemById/:id',userMiddleware,getProblemById)
problemRouter.get('/getAllProblem',userMiddleware,getAllproblem)
problemRouter.get('/problemSolvedByUser',userMiddleware,solvedAllProblemByUser)
problemRouter.get('/submittedProblem/:pid',userMiddleware,submittedProblem)

module.exports =problemRouter