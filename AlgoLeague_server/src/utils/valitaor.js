const validator = require('validator')

const validate = (data) => {
    const mandotairyField = ['firstName', 'emailId', 'password']

    const IsAllowed = mandotairyField.every((k) => Object.keys(data).includes(k))
    if (!IsAllowed) {
        throw new Error("Some field is mising")
    }
    if (!validator.isEmail(data.emailId)) {
        throw new Error("invalid Email")
    }
    if (!validator.isStrongPassword(data.password)) {
        throw new Error("Week password")
    }
}

module.exports = validate

