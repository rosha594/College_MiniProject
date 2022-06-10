const JWT = require('jsonwebtoken')

const gernrateToken = (id)=>{
    return JWT.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};

module.exports = gernrateToken;