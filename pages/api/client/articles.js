import Articles from "../../../db/articles";
import connect from "../../../middleware/connect";

const apiRoute = connect().get(async (req, res) => {
  const { M, S } = req.query;
  try {
    const allArticles = await Articles.find({
      columns: "title , imageurl , ArticleID , date",
      limit: { min: M || 10, max: M + 10 },
      orderBy: "ArticleID",
      selectors: S ? { SectionID: S } : undefined,
    });
    return res.status(200).json(allArticles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `حدث مشكلة اثناء استدعاء المقالات` });
  }
});

export default apiRoute;
