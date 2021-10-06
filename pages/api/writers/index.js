import Writers from "../../../db/writers";
import connect from "../../../middleware/connect";
import bcrypt from "bcrypt";
import { adminAuth } from "../../../middleware/auth";

const apiRoute = connect()
  .use(adminAuth)
  .post(async (req, res) => {
    const { writer_Image, writer_name, writer_password } = req.body;
    if (
      writer_name === "" ||
      !writer_name ||
      writer_password === "" ||
      !writer_password ||
      writer_Image === "" ||
      !writer_Image
    ) {
      return res.status(406).json({ message: `هنالك معلومات ناقصة` });
    }
    try {
      const hashedpassword = await bcrypt.hash(writer_password, 12);
      await Writers.save({
        name: writer_name,
        password: hashedpassword,
        imageUrl: writer_Image,
      });
      return res.status(200).json({ message: `تم إضافة الكاتب` });
    } catch (error) {
      return res.status(500).json({ message: `حدث مشكلة اثناء اضافة الكاتب` });
    }
  })
  .get(async (req, res) => {
    try {
      const allwriters = await Writers.find();
      return res.status(200).json(allwriters.reverse());
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: `حدث مشكلة اثناء استدعاء الكاتب` });
    }
  });

export default apiRoute;
