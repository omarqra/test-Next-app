import connect from "../../../middleware/connect";
import Section from "../../../db/section";

const apiRoute = connect().get(async (req, res) => {
  const { S } = req.query;
  try {
    const allArticles = await Section.find({ selectors: { SectionID: S } });
    return res.status(200).json(allArticles[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `حدث مشكلة اثناء استدعاء اسم القسم` });
  }
});

export default apiRoute;
