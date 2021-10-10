import Articles from "../../../db/articles";
import connect from "../../../middleware/connect";

const apiRoute = connect().get(async (req, res) => {
  try {
    const allArticles = await Articles.find({
      columns: "ArticleID",
    });
    return res.status(200).json(allArticles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `حدث مشكلة اثناء استدعاء المقالات` });
  }
});

export default apiRoute;
