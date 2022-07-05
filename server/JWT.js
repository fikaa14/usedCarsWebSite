const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    
    const accesToken = sign({ username: user.username, id: user.id}, "secretKEY123");

    return accesToken;

}

const validateToken = (req, res, next) => {
    
    const accessToken = req.cookies['access-token'];

    if(!accessToken) 
        return res.status(400).json({error: "User not Authenticated!"});

    try{

        const validToken = verify(accessToken, "secretKEY123");
        if(validToken) {
            req.authenticated = true;
            next();
            return true;
        }

    } catch(err) {
        return res.status(400).json({error:err.message});
    }

}


module.exports = { createTokens, validateToken }