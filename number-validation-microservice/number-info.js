const axios = require('axios');

const apiKey = '812abb0982834c44baced3152e0fb26f'

const getInfo = async (phoneNumber) => {
    if(!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.length === 0) throw new Error('phone required');
    const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${phoneNumber}`)
    if (response.status !== 200) throw new Error('internal error');
    else if(response.data.length === 0 || !response.data.valid) throw new Error('invalid number')
    return {
        countryCode : response.data.country.code,
        countryName : response.data.country.name,
        operatorName : response.data.carrier
    }
};

module.exports = getInfo;