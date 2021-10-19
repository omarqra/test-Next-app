import Link from "next/link";
import HomeSide from "../components/HomeSide/HomeSide";
import TopicsList from "../components/Topics/TopicsList";
import classes from "../styles/homePage.module.css";
import homebg from "../public/images/home/homebg.png";
import { useEffect, useState } from "react";
import { get_recent_Article } from "../apiRequest/axios";
// const StaticTopics = [
//   {
//     id: 1,
//     imgSrc: "/images/defult_article_image.png",
//     title: "أفضل أنواع نبات الظل",
//   },
//   {
//     id: 2,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: " أغرب الكائنات البحرية في العالم ",
//   },
//   {
//     id: 3,
//     imgSrc: "/images/defult_article_image.png",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
//   {
//     id: 4,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
//   {
//     id: 1,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "أفضل أنواع نبات الظل",
//   },
//   {
//     id: 2,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: " أغرب الكائنات البحرية في العالم ",
//   },
//   {
//     id: 3,
//     imgSrc: "/images/defult_article_image.png",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
//   {
//     id: 4,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
//   {
//     id: 1,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "أفضل أنواع نبات الظل",
//   },
//   {
//     id: 2,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: " أغرب الكائنات البحرية في العالم ",
//   },
//   {
//     id: 3,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
//   {
//     id: 4,
//     imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
//     title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
//   },
// ];

const Home = () => {
  const [topics, settopics] = useState([
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
    {
      imageurl: "/images/defult_article_image.png",
      title: " . . . . جاري تحميل البيانات",
    },
  ]);
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

  return (
    <main className={classes.main}>
      <section className={classes.homePackgroundDiv}>
        <img
          className={classes.homePackground}
          src={homebg.src}
          alt="home image"
        />
        <p className={classes.PrgOnImg}>اعرف أكثر عن المشروع</p>
      </section>

      <section className={classes.secandSection}>
        <span className={classes.header}>الأكثر زيارة</span>

        <div className={classes.homeSideAndTopics}>
          <TopicsList topics={topics} />
          <HomeSide />
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

              console.log(error);
            }
          }}
          className={classes.MoreLink}
        >
          المزيد
        </button>
      </section>
    </main>
  );
};

export default Home;
