import Section from "../../../db/section";
import { adminAuth } from "../../../middleware/auth";
import connect from "../../../middleware/connect";

const apiRoute = connect
  .use(adminAuth)
  .post(async (req, res) => {
    const { name } = req.body;
    if (!name || name === "") {
      res.status(401).json({ message: `خطاأ في اسم القسم` });
    }
    try {
      await Section.save({
        name,
      });
      res.status(200).json({ message: "تمت إضافة القسم" });
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء إضافة القسم` });
    }
  })
  .get(async (req, res) => {
    try {
      const { data } = await Section.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء استدعاء الاقسام` });
    }
  });
