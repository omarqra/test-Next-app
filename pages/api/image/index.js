import connect from "../../../middleware/connect";
import upload from "../../../middleware/multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = connect.use(upload.single("image")).put((req, res) => {
  const image = req.file.filename;
  return res.status(200).json({ imageUrl: `/images/${image}` });
});

export default apiRoute;
