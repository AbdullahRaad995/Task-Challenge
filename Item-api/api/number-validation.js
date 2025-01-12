require('dotenv').config();

let numberValidationURI = 'http://localhost:3000' || process.env.MONGO_URI

const validateNumber = async (number) => {
    let respone = await fetch(`${numberValidationURI}/validate?number=${number}`)
    if(respone.status !== 200) {
        let error = await respone.text();
        throw new Error(error)
    } else {
        let data = await respone.json()
        return data;
    }
}

module.exports = validateNumber