import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const writersAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.writerID = decodedData.writerID;

    next();
  } catch (error) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
};

export const adminAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.writerID = decodedData.writerID;
    next();
  } catch (error) {
    return res.status(401).redirect("/writer/login");
  }
};
