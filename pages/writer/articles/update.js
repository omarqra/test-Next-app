import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  deleteArticle,
  getSections,
  get_All_Article,
  get_Article,
} from "../../../apiRequest/axios";
import SideBare from "../../../components/sideBare/sideBare";
import Update_article from "../../../components/update_article/update_article";
import style from "../../../styles/update_article.module.scss";

const Update = () => {
  const [articles, setarticles] = useState([]);
  const [article, setarticle] = useState(false);
  const [Sections, setSections] = useState(false);

  const message = useRef(null);
  const setMessage = (M, good) => {
    message.current.style.padding = "20px";
    message.current.innerHTML = M;
    if (good) {
      message.current.style.backgroundColor = "green";
    } else {
      message.current.style.backgroundColor = "#cf2e2e";
    }
  };

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
    (async () => {
      try {
        const { data } = await getSections();
        setSections(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          setMessage(data.message);
        } else {
          setMessage("حصلت مشكلة اثناء استدعاء الأقسام");
        }
      }
    })();
  }, []);

  return (
    <div className={style.update}>
      <span
        className={style.message}
        ref={message}
        onClick={(e) => {
          e.target.innerHTML = "";
          e.target.style.padding = "0";
        }}
      ></span>
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
              <th>القسم</th>
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

        {article && (
          <Update_article
            article={article}
            message={message}
            setMessage={setMessage}
            Sections={Sections}
          />
        )}
      </main>
    </div>
  );
};

export default Update;
