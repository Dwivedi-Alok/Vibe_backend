import jwt from "jsonwebtoken";

export const generatetoken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // allow cross-origin
  });

  return token;
};
