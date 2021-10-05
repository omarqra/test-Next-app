import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  deleteArticle,
  get_All_Article,
  get_Article,
} from "../../../apiRequest/axios";
import SideBare from "../../../components/sideBare/sideBare";
import Update_article from "../../../components/update_article/update_article";
import style from "../../../styles/update_article.module.scss";

const Update = () => {
  const [articles, setarticles] = useState([]);
  const [article, setarticle] = useState(false);

  const getArticles = async () => {
    try {
      const { data } = await get_All_Article();
      setarticles(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.message === "قم بتسجيل الدخول اولا")
          window.location = "/writer/login";
        return;
      }
      console.log({ error });
    }
  };
  useEffect(() => {
    getArticles();
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
                    <th>
                      <button
                        onClick={async () => {
                          const { data } = await get_Article(item.ArticleID);
                          setarticle(data);
                        }}
                      >
                        تعديل
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const { data } = await deleteArticle(
                              item.ArticleID
                            );
                            getArticles();
                            setMessage(data.message, "good");
                          } catch (error) {
                            const { data } = error.response;
                            setMessage(data.message);
                          }
                        }}
                      >
                        حذف
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {articles.length === 0 && typeof articles === "object" && (
          <span>ليس هنالك اي مقال</span>
        )}

        {article && <Update_article article={article} />}
      </main>
    </div>
  );
};

export default Update;
