import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// auth user and get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // When a user logs in → server creates a JWT → stores it in a cookie.
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    // sets the cookie to a date in the past, effectively deleting it from the browser.
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users ");
});

// private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id ");
});

// private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete users ");
});

// private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update users ");
});

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};
