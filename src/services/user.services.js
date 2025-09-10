const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const UserModells = require("../Modells/User.Model");
const { OAuth2Client } = require("google-auth-library");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../Utils/jwt.utils");


const usercreateservice = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("All Field are required" );
  }

  const exist = await UserModells.findOne({
    $or: [{ email }],
  });

  if (exist) {
    throw new Error("User Already Exist")
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModells({
    name: name,
    password: hashedPassword,
    email: email,
    provider: null,
  });

  const created = await newUser.save();
  return created ? true : false;
};

const loginuserservice = async (email, password) => {

    const user = await UserModells.findOne({
        $or: [
            {email : email}
        ]
    });

    if(!user){
        throw new Error("User Does Not Exist")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid Credential")
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return ({ accessToken, refreshToken, user : {userID : user._id, email : user.email, name: user.name}})
}

const userwithgoogle = async( idToken) =>{

  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers : {Authorization: `Bearer ${idToken}`},
  })

  if(!response.ok){
    throw new Error("Invalid Token")
  }

  const userInfo = await response.json();

  let user = await UserModells.findOne({
    email : userInfo.email
  })

  if(!user){

    user = new UserModells({
      name: userInfo.name, 
      email: userInfo.name,
      password: null,
      provider: "google"
    })

    await user.save();
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return ({accessToken, refreshToken, user : {userID : user._id, email : user.email, name: user.name}});
}

const TokenRefreshService = async (token) => {

  if(!token) {
    throw new Error("No Refresh Token")
  }
    const decode = verifyRefreshToken(token);

    const user = UserModells.find({userID : decode.userID});

    if(!user){
      throw new Error(" User Not found");
    }

    const newAccessTokne = generateAccessToken(user);

    return ({accessToken : newAccessTokne});
}

module.exports = {
    loginuserservice,
    usercreateservice,
    userwithgoogle,
    TokenRefreshService
}
