import connect from "../../../middleware/connect";
import upload from "../../../middleware/multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = connect()
  .use(upload.single("image"))
  .put((req, res) => {
    try {
      const image = req.file.filename;
      return res.status(200).json({ imageUrl: `/images/${image}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حصلت مشكلة اثناء رفع الصورة" });
    }
  });

export default apiRoute;
