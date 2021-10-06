import Articles from "../../../db/articles";
import { writersAuth } from "../../../middleware/auth";
import connect from "../../../middleware/connect";

const apiRoute = connect()
  .get(async (req, res) => {
    const { ArticleID } = req.query;
    try {
      const allArticles = await Articles.find({ selectors: { ArticleID } });
      return res.status(200).json(allArticles[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `حدث مشكلة اثناء استدعاء المقالة` });
    }
  })
  .use(writersAuth)
  .delete(async (req, res) => {
    const { ArticleID } = req.query;
    const writer = req.writer;
    try {
      const article = await Articles.find({ selectors: { ArticleID } });
      if (article[0].writer === writer) {
        await Articles.delete({ ArticleID });
        return res.status(200).json({ message: `تم حذف المقال` });
      } else {
        return res.status(403).json({ message: `لايمكنك حذف هذا المقال` });
      }
    } catch (error) {
      return res.status(500).json({ message: `حدث مشكلة اثناء حذف المقال` });
    }
  })
  .put(async (req, res) => {
    const { ArticleID } = req.query;
    const { imageurl } = req.body;
    try {
      const allKeys = [
        "title",
        "htmlcontent",
        "imageurl",
        "description",
        "keyword",
        "SectionID",
      ];
      let article_Update_Data = {};
      allKeys.forEach((key) => {
        if (req.body[key] && req.body[key] !== "") {
          article_Update_Data[key] = req.body[key];
        }
      });

      if (
        Object.keys(article_Update_Data).length === 0 ||
        imageurl === "/images/defult_article_image.png"
      ) {
        return res
          .status(500)
          .json({ message: `ليس هنالك اي معلومات لتعديل المقال` });
      }

      await Articles.update({ ArticleID }, article_Update_Data);
      return res.status(200).json({ message: `تم تعديل المقال` });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: `حدثت مشكلة اثناء تعديل المقال` });
    }
  });

export default apiRoute;
