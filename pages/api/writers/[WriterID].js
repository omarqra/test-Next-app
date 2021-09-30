import Writers from "../../../db/writers";
import connect from "../../../middleware/connect";

const apiRoute = connect
  .delete(async (req, res) => {
    const { WriterID } = req.query;
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
        update.password = writer_password;
      }
      await Writers.update({ WriterID }, update);
      res.status(200).json({ message: `تم تعديل الكاتب` });
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء تعديل الكاتب` });
    }
  });

export default apiRoute;
