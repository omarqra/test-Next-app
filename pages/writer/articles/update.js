import Head from "next/head";
import { useEffect, useState } from "react";
import { get_All_Article } from "../../../apiRequest/axios";
import SideBare from "../../../components/sideBare/sideBare";
import style from "../../../styles/update_article.module.scss";

const Update = () => {
  const [articles, setarticles] = useState([]);
  useEffect(() => {
    if (articles.length === 0) {
      (async () => {
        const { data } = await get_All_Article();
        setarticles(data);
      })();
    }
  }, []);

  return (
    <div className={style.update}>
      <Head>
        <title>تعديل مقالة</title>
        <meta name="description" content="صفحة تعديل المقالة لموقع خبر ومقال" />
        <meta name="keywords" content="تعديل مقالة , مقالة" />
      </Head>
      <SideBare />
      <main>
        <h1>تعديل مقالة</h1>
        <table>
          <thead>
            <tr>
              <th>الرقم</th>
              <th>العنوان</th>
              <th>الكاتب</th>
              <th>حذف / تعديل</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 &&
              typeof articles === "object" &&
              articles.map((item) => {
                return (
                  <tr key={`article_${item.ArticleID}`}>
                    <th>{item.ArticleID}</th>
                    <th>{item.title}</th>
                    <th>{item.writer}</th>
                    <th>حذف / تعديل</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {articles.length === 0 && typeof articles === "object" && (
          <span>ليس هنالك اي مقال</span>
        )}
      </main>
    </div>
  );
};

export default Update;
