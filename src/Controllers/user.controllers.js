const {
  loginuserservice,
  usercreateservice,
  userwithgoogle,
  TokenRefreshService,
} = require("../services/user.services.js");

const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await usercreateservice(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const { accessToken, refreshToken, user } = await loginuserservice(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,               // only over HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { accessToken, refreshToken, user } = await userwithgoogle(idToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,               // only over HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const RefreshToken = async( req, res ) =>{
  const token = req.cookies.refreshToken;

  const { accessToken } = await TokenRefreshService(token);

  res.status(200).json({ accessToken })
}

module.exports = {
  UserLogin,
  UserRegister,
  googleLogin,
  RefreshToken,
};
