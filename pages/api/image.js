import connect from "../../middleware/connect";
import upload from "../../middleware/multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = connect
  .use(upload.single("image"))
  .post((req, res) => {
    const image = req.file.filename;
    res.status(200).json({ imageUrl: `/images/${image}` });
  })
  .delete((req, res) => {
    const { imageurl } = req.body;
    console.log(imageurl);
    res.status(200).json({ imageUrl: `/images/${imageurl}` });
  });

export default apiRoute;
