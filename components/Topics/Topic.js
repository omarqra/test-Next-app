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
      <div className={classes.divDetails}>
        <div className={classes.divCardHeader}>
          <h3 className={classes.cardHeader}>{topicData.title}</h3>
        </div>
        <Link href="/">
          <a className={classes.cardMore}>اقرأ الآن</a>
        </Link>
      </div>
    </div>
  );
};
export default Topic;
