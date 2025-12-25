const Problem = require("../model/problem");
const Submission = require("../model/submission");
const User = require("../model/user");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const submitCode = async (req, res) => {

    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body
        if (language === "cpp") {
            language = "c++";
        }
        if (!userId || !code || !problemId || !language) {
            return res.status(400).send("some field missing")
        }

        const problem = await Problem.findById(problemId)

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed: 0,
            status: 'pending',
            testCasesTotal: problem.hiddentestcases.length
        })
        const languageId = getLanguageById(language)
        const submissions = problem.hiddentestcases.map((testcase) => ({

            source_code: code,
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

        let testCasesPassed = 0
        let runtime = 0;
        let memory = 0;
        let status = 'accepted'
        let errorMessage = null
        for (const test of textResult) {
            if (test.status_id == 3) {
                testCasesPassed++;
                runtime += parseFloat(test.time)
                memory = Math.max(memory, test.memory)
            } else {
                if (test.status_id == 4) {
                    status = 'error'
                    errorMessage = test.stderr
                } else {
                    status = 'wrong'
                    errorMessage = test.stderr
                }
            }
        }

        submittedResult.status = status
        submittedResult.testCasesPassed = testCasesPassed
        submittedResult.errorMessage = errorMessage
        submittedResult.runtime = runtime
        submittedResult.memory = memory
        await submittedResult.save()

        if (!req.result.problemSolved.includes(problemId)) {
            req.result.problemSolved.push(problemId)
            await req.result.save();
        }

        const accepted = (status == 'accepted')
        res.status(201).json({
            accepted,
            testCasesTotal: submittedResult.testCasesTotal,
            passedTestCases: testCasesPassed,
            runtime,
            memory,
            source_code: textResult[0].source_code
        });

    } catch (err) {
        res.status(500).send("Internal server error " + err)
    }
}

const runCode = async (req, res) => {

    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body
        if (language === "cpp") {
            language = "c++";
        }
        if (!userId || !code || !problemId || !language) {
            return res.status(400).send("some field missing")
        }
        const problem = await Problem.findById(problemId)

        const languageId = getLanguageById(language)
        const submissions = problem.visibletestcases.map((testcase) => ({

            source_code: code,
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
        const testResult = await submitToken(resulttoken)

        let testCasesPassed = 0
        let runtime = 0
        let memory = 0
        let status = true
        let errorMessage = null
        for (const test of testResult) {
            if (test.status_id == 3) {
                testCasesPassed++
                runtime = runtime + parseFloat(test.time)
                memory = Math.max(memory, test.memory)
            } else {
                if (test.status_id == 4) {
                    status = false
                    errorMessage = test.stderr
                }
                else {
                    status = false
                    errorMessage = test.stderr
                }
            }
        }
        res.status(201).json({
            success: status,
            testCases: testResult,
            runtime,
            memory
           
        });

    } catch (err) {
        res.status(500).send("Internal server error " + err)
    }
}




module.exports = { submitCode, runCode }