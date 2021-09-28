import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connect from "../../../middleware/connect";
dotenv.config();

const writersAuth = connect.get(async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "لم يتم التوافق" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.writerID = decodedData.writerID;
    return res.status(200).json({ message: "تم التوافق بنجاح" });
  } catch (error) {
    try {
      const decodedData = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
      req.writerID = decodedData.writerID;
      return res.status(200).json({ message: "تم التوافق بنجاح" });
    } catch (error) {
      return res.status(401).json({ message: "لم يتم التوافق" });
    }
  }
});
export default writersAuth;
