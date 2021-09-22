import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      let ext = ".jpeg";
      if (file.mimetype === "image/svg+xml") {
        ext = ".svg";
      }
      cb(null, file.originalname.split(".")[0] + "-" + Date.now() + ext);
    },
  }),
});

export default upload;
