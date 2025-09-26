import cloudinary from "../lib/cloudinary.js";
import { generatetoken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";

// -------------------- MULTER SETUP --------------------
const storage = multer.memoryStorage();
export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// -------------------- SIGNUP --------------------
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;

    if (!fullName || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender.toLowerCase())) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      gender: gender.toLowerCase(),
      isActive: true,
      lastSeen: new Date(),
    });

    await newUser.save();
    generatetoken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
      isActive: newUser.isActive,
      lastSeen: newUser.lastSeen,
    });
  } catch (err) {
    console.error("Error in signup controller ❌:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials!" });

    user.isActive = true;
    user.lastSeen = new Date();
    await user.save();

    generatetoken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      gender: user.gender,
      isActive: user.isActive,
      lastSeen: user.lastSeen,
    });
  } catch (error) {
    console.log("Error in login controller ❌", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- LOGOUT --------------------
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller ❌", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- UPDATE PROFILE --------------------
export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "Profile Picture is required!" });
    }

    // Upload image buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Cloudinary upload failed" });

        const updateUser = await User.findByIdAndUpdate(
          userId,
          { profilePic: result.secure_url },
          { new: true }
        );

        res.status(200).json({ message: "Profile pic uploaded", profilePic: updateUser.profilePic });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.log("Error in updateProfile controller ❌", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- CHECK AUTH --------------------
export const checkAuth = async (req, res) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { lastSeen: new Date() });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller ❌", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
