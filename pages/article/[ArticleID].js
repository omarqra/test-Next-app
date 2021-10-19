import Head from "next/head";
import { useRouter } from "next/router";
import HomeSide from "../../components/HomeSide/HomeSide";
import classes from "../../styles/homePage.module.css";
import style from "../../styles/ArticleID.module.scss";
import TopicsList from "../../components/Topics/TopicsList";
import {
  get_all_Article_titles,
  get_one_Article,
  get_recent_Article,
} from "../../apiRequest/axios";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar");

export async function getStaticPaths() {
  const { data } = await get_all_Article_titles();
  const paths = data.map((article) => ({
    params: { ArticleID: JSON.stringify(article.ArticleID) },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await get_one_Article(params.ArticleID);

  return {
    props: {
      data,
    },
    revalidate: 120,
  };
}

const Article = ({ data }) => {
  const [topics, settopics] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await get_recent_Article();
        settopics(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const router = useRouter();
  return (
    <div className={style.articlepage}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keyword} />
      </Head>
      <main>
        <section className={style.layout}>
          <article>
            <h1>{data.title}</h1>
            <div className={style.data_and_watch}>
              <span>{moment(data.date).fromNow()}</span>
              <span>{data.visitors} مشاهدة</span>
            </div>
            <div className={style.main_img}>
              <img src={data.imageurl} />
            </div>
            <div className={style.mainContext}>
              {ReactHtmlParser(data.htmlcontent)}
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "larger",
                margin: "50px 15px",
              }}
            >
              كاتب المقال : محمد مطرجي
            </p>
          </article>
        </section>

        <section>
          <span className={classes.header}>إقرأ أيضاً</span>

          <div className={classes.homeSideAndTopics}>
            <TopicsList topics={topics} />
          </div>

          <button
            onClick={async (e) => {
              try {
                e.target.disabled = true;
                e.target.innerHTML = "جاري التحميل ...";

                const { data } = await get_recent_Article(topics.length);
                settopics([...topics, ...data]);

                e.target.disabled = false;
                e.target.innerHTML = "المزيد";
              } catch (error) {
                e.target.innerHTML = "مشكلة في التحميل";
                e.target.disabled = false;
              }
            }}
            className={classes.MoreLink}
          >
            المزيد
          </button>
        </section>
      </main>
      <HomeSide />
    </div>
  );
};

export default Article;
