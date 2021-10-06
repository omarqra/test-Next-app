import jwt from "jsonwebtoken";

export const writersAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.writerID = decodedData.WriterID;
    req.writer = decodedData.writer;
    next();
  } catch (error) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
};

export const adminAuth = async (req, res, next) => {
  if (!req.headers.authorization_1) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
  const token = req.headers.authorization_1.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.writerID = decodedData.writerID;
    req.writer = decodedData.writer;
    next();
  } catch (error) {
    return res.status(403).json({ message: "قم بتسجيل الدخول اولا" });
  }
};
