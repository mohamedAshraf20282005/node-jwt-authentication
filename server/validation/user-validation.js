const {object,string} = require('zod');

const dataValidation = object({
    userName:string(),
    email:string().email(),
    password:string().min(8)
})

module.exports = dataValidation

