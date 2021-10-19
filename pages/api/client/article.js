import Articles from "../../../db/articles";
import connect from "../../../middleware/connect";

const apiRoute = connect().get(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(500).json({ message: `هذه المقالة غير متوفرة حالياً` });
  }
  try {
    const Article = await Articles.find({
      columns:
        "title , writer , htmlcontent , imageurl , description , visitors , date",
      selectors: { ArticleID: id },
    });
    if (Article.length === 0) {
      return res.status(500).json({ message: `هذه المقالة غير متوفرة حالياً` });
    }
    await Articles.update(
      { ArticleID: id },
      { visitors: Article[0].visitors + 1 }
    );
    return res.status(200).json(Article[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `حدث مشكلة اثناء استدعاء المقالات` });
  }
});

export default apiRoute;
