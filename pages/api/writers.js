import Writers from "../../db/writers";
import connect from "../../middleware/connect";
import bcrypt from "bcrypt";

const apiRoute = connect
  .get(async (req, res) => {
    console.log("haloo");
    try {
      const allwriters = await Writers.find();
      res.status(200).json({ allwriters });
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء اضافة الكاتب` });
    }
  })
  .post(async (req, res) => {
    const { name, password, imageUrl } = req.body;
    if (
      name === "" ||
      !name ||
      password === "" ||
      !password ||
      imageUrl === "" ||
      !imageUrl
    ) {
      return res.status(406).json({ message: `هنالك معلومات ناقصة` });
    }
    try {
      const hashedpassword = await bcrypt.hash(password, 12);
      await Writers.save({
        name,
        password: hashedpassword,
        imageUrl,
      });
      res.status(200).json({ message: `تم إضافة الكاتب` });
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء اضافة الكاتب` });
    }
  })
  .delete((req, res) => {
    res.status(200).json({ imageUrl: `تم حذف الكاتب` });
  });

export default apiRoute;
