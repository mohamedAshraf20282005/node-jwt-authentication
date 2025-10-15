const {object,string} = require('zod');

const registerValidation = object({
    userName:string(),
    email:string().email(),
    password:string().min(8)
})

module.exports = {
    registerValidation
}
