import Articles from "../../../db/articles";
import { writersAuth } from "../../../middleware/auth";
import connect from "../../../middleware/connect";

const apiRoute = connect()
  .use(writersAuth)
  .post(async (req, res) => {
    const writer = req.writer;
    const { title, htmlcontent, imageurl, description, keyword, SectionID } =
      req.body;

    let missing_data = false;
    const keys = [
      "keyword",
      "title",
      "htmlcontent",
      "imageurl",
      "description",
      "SectionID",
    ];
    keys.forEach((element) => {
      if (req.body[element]) {
        if (req.body[element] === "") {
          missing_data = true;
        }
        return;
      } else {
        missing_data = true;
      }
    });
    if (missing_data) {
      return res.status(500).json({ message: "هنالك معلومات ناقصة في المقال" });
    }
    if (imageurl === "/images/defult_article_image.png") {
      return res.status(500).json({ message: "لا يجب نشر مقال بدون صورة" });
    }
    try {
      await Articles.save({
        title,
        htmlcontent,
        imageurl,
        description,
        writer,
        keyword,
        SectionID,
      });
      return res.status(200).json({ message: "تم إضافة المقال بنجاح" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدثت مشكلة اثناء إضافة المقال" });
    }
  })
  .get(async (req, res) => {
    const writer = req.writer;
    try {
      if (writer === "admin") {
        const allArticles = await Articles.find();
        return res.status(200).json(allArticles.reverse());
      } else {
        const allArticles = await Articles.find({
          selectors: { writer },
          columns: "ArticleID , title , writer",
        });
        return res.status(200).json(allArticles.reverse());
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: `حدث مشكلة اثناء استدعاء المقالات` });
    }
  });

export default apiRoute;
