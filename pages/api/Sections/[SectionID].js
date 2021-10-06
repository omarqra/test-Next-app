import connect from "../../../middleware/connect";
import { adminAuth } from "../../../middleware/auth";
import Section from "../../../db/section";
import Articles from "../../../db/articles";

const apiRoute = connect()
  .use(adminAuth)
  .delete(async (req, res) => {
    const { SectionID } = req.query;
    try {
      await Section.delete({ SectionID });
      await Articles.delete({ SectionID });
      return res.status(200).json({ message: `تم حذف القسم` });
    } catch (error) {
      return res.status(500).json({ message: `حدث مشكلة اثناء حذف القسم` });
    }
  })
  .put(async (req, res) => {
    const { name } = req.body;
    const { SectionID } = req.query;
    if (!SectionID || !name || name === "") {
      return res.status(406).json({ message: `هنالك معلومات ناقصة` });
    }
    try {
      await Section.update({ SectionID }, { name });
      return res.status(200).json({ message: `تم تعديل اسم القسم` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `حدث مشكلة اثناء تعديل اسم القسم`, error });
    }
  });

export default apiRoute;
