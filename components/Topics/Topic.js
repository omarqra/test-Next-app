import Link from "next/link";
import classes from "./Topic.module.css";
const Topic = (props) => {
  const topicData = props.topicData;
  return (
    <div className={classes.divCard}>
      <div className={classes.divCardImage}>
        <span className={classes.addedAt}>منذ 3 ساعات</span>
        <div className={classes.image}>
          <img
            className={classes.cardImage}
            src={topicData.imageurl}
            alt={topicData.title}
            width={50}
            height={50}
          />
        </div>
      </div>
      <h3 className={classes.cardHeader}>{topicData.title}</h3>
      <Link href="/">
        <a className={classes.cardMore}>اقرأ الآن</a>
      </Link>
    </div>
  );
};
export default Topic;
