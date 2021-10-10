import { useRouter } from "next/router";
import Link from "next/link";
import classes from "../../styles/homePage.module.css";
import TopicsList from "../../components/Topics/TopicsList";
import HomeSide from "../../components/HomeSide/HomeSide";
import {
  get_all_Article_titles,
  get_one_Article,
} from "../../apiRequest/axios";
const StaticTopics = [
  {
    id: 1,
    imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
    title: "أفضل أنواع نبات الظل",
  },
  {
    id: 2,
    imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
    title: "أغرب الكائنات البحرية في العالم",
  },
  {
    id: 3,
    imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
    title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
  },
];

export async function getStaticPaths() {
  const { data } = await get_all_Article_titles();
  const paths = data.map((article) => ({
    params: { ArticleID: article.ArticleID },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await get_one_Article(params.ArticleID);
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        data,
      },
      revalidate: 120,
    };
  }
  console.log(context);
  return;
}

const Article = () => {
  const router = useRouter();
  return (
    <div>
      {/* <Link href="/"><a className={classes.detailsLinksS} location="top">أغرب الكائنات البحرية في العالم بالصور</a></Link> */}

      <span className={classes.detailsLinks} location="top">
        اقرأ أيضاً
      </span>

      <div className={classes.homeSideAndTopics}>
        <TopicsList topics={StaticTopics} />
        <HomeSide />
      </div>
      <Link href="/">
        <a className={classes.detailsLinks} location="top">
          المزيد
        </a>
      </Link>
    </div>
  );
};

export default Article;
