import Writers from "../../../db/writers";
import connect from "../../../middleware/connect";

const apiRoute = connect.delete(async (req, res) => {
  const { WriterID } = req.query;
  try {
    await Writers.delete({ WriterID });
    return res.status(200).json({ message: `تم حذف الكاتب` });
  } catch (error) {
    return res.status(500).json({ message: `حدث مشكلة اثناء حذف الكاتب` });
  }
});

export default apiRoute;
