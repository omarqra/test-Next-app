import Writers from "../../../db/writers";
import connect from "../../../middleware/connect";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const apiRoute = connect.patch(async (req, res) => {
  const { username: name, password } = req.body;
  if (!name || name === "" || !password || password.length < 5) {
    return res.status(401).json({ message: `هنالك معلومات ناقصة` });
  }
  try {
    if (name === "admin") {
      const isCorrecte_admin_password = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD
      );
      if (isCorrecte_admin_password) {
        const token = jwt.sign(
          { WriterID: 0, writer: "admin" },
          process.env.JWT_ADMIN_SECRET
        );
      }
      return res.status(200).json({ token, message: "مرحبا آدمن" });
    }
    const allwriters = await Writers.find({
      selectors: { name },
      columns: "name , password , WriterID",
    });
    if (allwriters.length !== 1) {
      return res
        .status(401)
        .json({ message: `اسم الكاتب او كلمة المرور خاطئة` });
    } else {
      const isCorrecte = await bcrypt.compare(password, allwriters[0].password);
      if (isCorrecte) {
        const token = jwt.sign(
          { WriterID: allwriters[0].WriterID, writer: allwriters[0].name },
          process.env.JWT_SECRET
        );
        return res
          .status(200)
          .json({ token, message: "تم تسجيل الدخول بنجاح" });
      } else {
        return res
          .status(401)
          .json({ message: `اسم الكاتب او كلمة المرور خاطئة` });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `حدث مشكلة اثناء تسجيل الدخول` });
  }
});

export default apiRoute;
