import Link from "next/link";
import HomeSide from "../components/HomeSide/HomeSide";
import TopicsList from "../components/Topics/TopicsList";
import classes from "../styles/homePage.module.css";
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

const Home = () => {
  return (
    <div>
      <div className={classes.homePackgroundDiv}>
        <img
          className={classes.homePackground}
          src="http://www.hdwallpaperspulse.com/wp-content/uploads/2015/05/30/art-desktop-luxury-wallpapers.jpg"
          alt="home image"
        />
        <p className={classes.PrgOnImg}>اعرف أكثر عن المشروع</p>
      </div>
      <Link href="/">
        <a className={classes.detailsLinks}>الأكثر زيارة</a>
      </Link>
      <div className={classes.homeSideAndTopics}>
        <TopicsList topics={StaticTopics} />
        <HomeSide />
      </div>
      <Link href="/">
        <a className={classes.detailsLinks}>المزيد</a>
      </Link>
    </div>
  );
};

export default Home;
