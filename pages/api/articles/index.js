import Articles from "../../../db/articles";
import connect from "../../../middleware/connect";

const apiRoute = connect
  .get(async (req, res) => {
    try {
      const allArticles = await Articles.find();
      res.status(200).json(allArticles);
    } catch (error) {
      res.status(500).json({ message: `حدث مشكلة اثناء استدعاء المقالة` });
    }
  })
  .post(async (req, res) => {
    const { title, htmlcontent, imageurl, description, writer } = req.body;
    if (imageurl === "/images/defult_article_image.png") {
      return res.status(500).json({ message: "لا يجب نشر مقال بدون صورة" });
    }
    Object.keys(req.body).forEach((element) => {
      if (req.body[element] === "") {
        return res
          .status(500)
          .json({ message: "هنالك معلومات ناقصة في المقال" });
      }
    });
    try {
      await Articles.save({
        title,
        htmlcontent,
        imageurl,
        description,
        writer,
      });
      return res.status(200).json({ message: "تم إضافة المقال بنجاح" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدثت مشكلة اثناء إضافة المقال" });
    }
  });

export default apiRoute;
