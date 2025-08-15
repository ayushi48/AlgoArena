const axios = require('axios')


const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63,
    }
    return language[lang.toLowerCase()]
}

const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_API,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: { submissions }
        // console.log(submissions);

    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data
        } catch (error) {
            // console.error(error);
            // return null
        }
    }

    return await fetchData();
}

const waiting = async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer);
}


const submitToken = async (resultToken) => {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_API,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    while (true) {
        const result = await fetchData();

        const IsresultObtained = result.submissions.every((r) => r.status_id > 2)

        if (IsresultObtained) {
            return result.submissions
        }
        await waiting(1000)
    }

}

module.exports = { getLanguageById, submitBatch, submitToken }
// const axios = require('axios')


// const getLanguageById = (lang) => {
//     const language = {
//         "javascript": 50,
//         "c++": 54,
//         "java": 62,
//     }
//     return language[lang.toLowerCase()]
// }

// const submitBatch = async (submissions) => {
//     // console.log(submissions);

//     const options = {
//         method: 'POST',
//         url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//         params: {
//             base64_encoded: 'false'
//         },
//         headers: {
//             'x-rapidapi-key': process.env.JUDGE0_API,
//             'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         },
//         data: { submissions }
//         // console.log(submissions);

//     };

//     async function fetchData() {

//         try {
//             console.log("sdfsdfwsefws");
//             const response = await axios.request(options);
//             // console.log("sdfsdfwsefws");
//             // console.log("\n\n\n");
//             // console.log("response");

//             // console.log(response);

//             return response.data
//         } catch (error) {
//             // console.error("submitBatch failed:", error.response?.data || error.message);
//             console.log("errrrrrrrrrrrrr");
            
//             throw error;

//             // console.error(error);
//             // return null
//         }
//     }

//     return await fetchData();
// }

// const waiting = async (timer) => {
//     setTimeout(() => {
//         return 1;
//     }, timer);
// }


// const submitToken = async (resultToken) => {
//     const options = {
//         method: 'GET',
//         url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//         params: {
//             tokens: resultToken.join(","),
//             base64_encoded: 'false',
//             fields: '*'
//         },
//         headers: {
//             'x-rapidapi-key': process.env.JUDGE0_API,
//             'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
//         }
//     };

//     async function fetchData() {
//         try {
//             const response = await axios.request(options);
//             return response.data
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     while (true) {
//         const result = await fetchData();

//         const IsresultObtained = result.submissions.every((r) => r.status_id > 2)

//         if (IsresultObtained) {
//             return result.submissions
//         }
//         await waiting(1000)
//     }

// }

// module.exports = { getLanguageById, submitBatch, submitToken }