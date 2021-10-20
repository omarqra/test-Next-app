import Writers from "../../db/writers";
import Articles from "../../db/articles";
import Section from "../../db/section";

let n = 0;
export default async function handler(req, res) {
  n += 1;
  if (n > 1) {
    return res
      .status(500)
      .json({ message: "لا يمكن انشاء القوائم اكثر من مرة" });
  }
  //   const data = await Articles.find();
  //   if (data.lenght > 0) {
  //   return res
  //       .status(500)
  //       .json({ message: "لا يمكن اعادة انشاء القوائم اكثر من مرة" });
  //   }
  const tables = [Articles, Writers, Section];
  tables.forEach(async (table) => {
    try {
      // await table.dropTable();
      await table.creatTable();
      if (table === Writers) {
        await Writers.save({
          name: "admin",
          password: "",
          imageUrl: "/images/defult-user-image.svg",
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
  return res.status(200).json({ message: "تم إنشاء القوائم" });
}
