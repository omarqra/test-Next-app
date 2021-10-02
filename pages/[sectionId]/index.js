import { useRouter } from "next/router";
import TopicsList from "../../components/Topics/TopicsList";
import HomeSide from "../../components/HomeSide/HomeSide"
import classes from "../../styles/homePage.module.css"
import Link from "next/link"
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
    {
      id: 4,
      imgSrc: "https://i.ytimg.com/vi/GRA89joKjp4/maxresdefault.jpg",
      title: "فالبروات الصودوم valproate Sodiur الأدوية المضادة للصرع",
    },
  ];

const Section = () => {
    const router = useRouter();
    // router.route = `sectionId:${router.query.sectionId}`;
    const sectionId = router.query.sectionId;
    return (
        <div>
            <Link href="/"><a className={classes.detailsLinksS} location="top">قسم التكنلوجيا</a></Link>
            <div className={classes.homeSideAndTopics}>
                <TopicsList topics={StaticTopics}/>
                <HomeSide />
            </div>
            <Link href="/"><a className={classes.detailsLinksS} location="bottom">المزيد</a></Link>
        </div>
    )
}

export default Section;