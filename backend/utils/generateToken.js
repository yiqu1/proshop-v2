import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // create a token, pass in some data: userId (payload) and sign it with secret
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set jwt as http-only cookie, HttpOnly cookie: can’t be accessed by JavaScript → safer
  res.cookie("jwt", token, {
    httpOnly: true, // can't be accessed by JS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
    sameSite: "strict", // protect against CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
