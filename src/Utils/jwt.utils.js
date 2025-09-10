const jwt = require("jsonwebtoken")

const generateAccessToken = ( user ) => {
    return jwt.sign(
        {userID : user.userID, email : user.email, name: user.name},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m"}
    );

};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {userID: user.userID, email: user.email, name: user.name},
        process.env.ACCESS_TOKEN_REFRESH,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"}
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token,  process.env.ACCESS_TOKEN_REFRESH);
}

module.exports ={
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}