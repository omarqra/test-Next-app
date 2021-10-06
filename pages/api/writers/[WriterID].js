import Writers from "../../../db/writers";
import connect from "../../../middleware/connect";
import bcrypt from "bcrypt";
import { adminAuth } from "../../../middleware/auth";
import Articles from "../../../db/articles";

const apiRoute = connect()
  .use(adminAuth)
  .delete(async (req, res) => {
    const { WriterID } = req.query;
    if (WriterID === "1") {
      return res.status(403).json({ message: `لا يمكن حذف الآدمن` });
    }
    try {
      await Writers.delete({ WriterID });
      return res.status(200).json({ message: `تم حذف الكاتب` });
    } catch (error) {
      return res.status(500).json({ message: `حدث مشكلة اثناء حذف الكاتب` });
    }
  })
  .put(async (req, res) => {
    const { writer_Image, writer_name, writer_password } = req.body;
    const { WriterID } = req.query;
    if (!WriterID) {
      return res.status(406).json({ message: `هنالك معلومات ناقصة` });
    }
    if (
      (!writer_Image || writer_Image === "") &&
      (!writer_name || writer_name === "") &&
      (!writer_password || writer_password === "")
    ) {
      return res.status(406).json({ message: `هنالك معلومات ناقصة` });
    }
    try {
      let update = {};
      if (writer_Image && writer_Image !== "") {
        update.imageUrl = writer_Image;
      }
      if (writer_name && writer_name !== "") {
        update.name = writer_name;
      }
      if (writer_password && writer_password !== "") {
        const hashedpassword = await bcrypt.hash(writer_password, 12);
        update.password = hashedpassword;
      }
      const theWriter = await Writers.find({ selectors: { WriterID } });

      if (update.name) {
        await Articles.update(
          { writer: theWriter[0].name },
          { writer: update.name }
        );
      }
      await Writers.update({ WriterID }, update);
      return res.status(200).json({ message: `تم تعديل الكاتب` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `حدث مشكلة اثناء تعديل الكاتب` });
    }
  });

export default apiRoute;
