import Section from "../../../db/section";
import { adminAuth, writersAuth } from "../../../middleware/auth";
import connect from "../../../middleware/connect";

const apiRoute = connect()
  .get(async (req, res) => {
    try {
      const data = await Section.find();
      return res.status(200).json(data.reverse());
    } catch (error) {
      return res
        .status(500)
        .json({ message: `حدث مشكلة اثناء استدعاء الاقسام` });
    }
  })
  .use(adminAuth)
  .post(async (req, res) => {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(401).json({ message: `خطاأ في اسم القسم` });
    }
    try {
      await Section.save({
        name,
      });
      return res.status(200).json({ message: "تمت إضافة القسم" });
    } catch (error) {
      return res.status(500).json({ message: `حدث مشكلة اثناء إضافة القسم` });
    }
  });

export default apiRoute;
