import { useRouter } from "next/router";
import Link from "next/link"
import classes from "../../../styles/homePage.module.css"
import TopicsList from "../../../components/Topics/TopicsList";
import HomeSide from "../../../components/HomeSide/HomeSide";
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

const TopicPage = () => {
    const router = useRouter();
    return (
        <div>
            {/* <Link href="/"><a className={classes.detailsLinksS} location="top">أغرب الكائنات البحرية في العالم بالصور</a></Link> */}
            <Link href="/"><a className={classes.detailsLinks} location="top">اقرأ أيضاً</a></Link>
            <div className={classes.homeSideAndTopics}>
                <TopicsList topics={StaticTopics}/>
                <HomeSide />
            </div>
            <Link href="/"><a className={classes.detailsLinks} location="top">المزيد</a></Link>
        </div>
    )
}

export default TopicPage;