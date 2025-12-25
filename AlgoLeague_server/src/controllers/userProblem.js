const Problem = require("../model/problem");
const Submission = require("../model/submission");
const User = require("../model/user");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");


const createProblem = async (req, res) => {
    console.log("createproblem req.body");
    
    console.log(req.body);
    
    const { StartCode, referenceSolution, problemCreator, title, description, difficulty, tags, visibletestcases, hiddentestcases } = req.body;

    try {

        for (const { language, completeCode } of referenceSolution) {

            const languageId = getLanguageById(language)
            const submissions = visibletestcases.map((testcase) => ({

                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output,
            }))

            const submitResult = await submitBatch(submissions)
            console.log("submitresult");
            
            console.log(submitResult);
            
            if (!submitResult || !Array.isArray(submitResult)) {
                console.error("submitBatch failed. Submissions:", submissions);
                return res.status(500).send("Failed to submit test cases to Judge0.");
            }

            const resulttoken = submitResult.map((value) => value.token)
            const textResult = await submitToken(resulttoken)

            for (const test of textResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Error Occured")
                }
            }
        }

        const userProblem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        })
        
        res.status(201).send("Problem added successfully")
    } catch (err) {
        res.status(400).send("ERROR: " + err)
    }
}


const updateProblem = async (req, res) => {
    const { id } = req.params;
       const { StartCode, referenceSolution, problemCreator,
        title, description, difficulty, tags, visibletestcases,
        hiddentestcases } = req.body;
    try {
        if (!id) {
            return res.status(400).send("MISSING ID")
        }

        const DsaProblem = await Problem.findById(id);

        if (!DsaProblem) {
            return res.status(404).send("ID is not persent in server");

        }


        for (const { language, completeCode } of referenceSolution) {

            const languageId = getLanguageById(language)
            const submissions = visibletestcases.map((testcase) => ({

                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output,
            }))
           
            const submitResult = await submitBatch(submissions)
            if (!submitResult || !Array.isArray(submitResult)) {
                console.error("submitBatch failed. Submissions:", submissions);
                return res.status(500).send("Failed to submit test cases to Judge0.");
            }

            const resulttoken = submitResult.map((value) => value.token)
            const textResult = await submitToken(resulttoken)

            for (const test of textResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Error Occured")
                }
            }
        }

        const newproblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true })


        res.status(200).send("Problem updated successfully\n" + newproblem)
    } catch (err) {
        res.status(500).send("ERROR:", +err)
    }


}

const deleteProblem = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).send("MISSING ID")
        }

        const deletedProblem = await Problem.findByIdAndDelete(id)
        if (!deletedProblem) {
            return res.status(404).send("PROBLEM IS MISSING")
        }

        res.status(200).send("SUCCESSFULLY DELETED")

    } catch (err) {
        res.status(500).send("ERROR: ", +err)
    }
}

const getProblemById = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).send("MISSING ID")
        }

        const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibletestcases StartCode referenceSolution')
        if (!getProblem) {
            return res.status(404).send("PROBLEM IS MISSING")
        }

        res.status(200).send(getProblem)   

    } catch (err) {
        res.status(500).send("ERROR: ", +err)
    }
}

const getAllproblem = async (req, res) => {

    try {
        // const getProblem = await Problem.find().skip().limit()
        // const page = count of all data divided by 10
        // const limit = 10
        // const skip = (page -1)*limit
        const getProblem = await Problem.find({}).select('_id title difficulty tags')
        if (getProblem.length == 0) {
            return res.status(404).send("PROBLEM IS MISSING")
        }

        res.status(200).send(getProblem)

    } catch (err) {
        res.status(500).send("ERROR: ", +err)
    }
}

const solvedAllProblemByUser = async(req,res)=>{
    try{

        // const count = req.result.problemSolved.length
        // res.status(200).send(req.result.problemSolved)

        const userId = req.result._id
       
        const user = await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        })
 
        res.status(200).send(user.problemSolved)
    }catch(err){
        res.status(500).send("SERVER ERROR")
    }
}

const submittedProblem = async(req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.pid
        const ans = await Submission.find({userId,problemId})
        res.status(200).send(ans)
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}




module.exports = { createProblem, updateProblem, deleteProblem, getProblemById, getAllproblem,solvedAllProblemByUser,submittedProblem }