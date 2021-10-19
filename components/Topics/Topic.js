import Link from "next/link";
import classes from "./Topic.module.css";
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar");

const Topic = (props) => {
  const topicData = props.topicData;
  const f = (d) => {
    const date = new Date(d);
    return date.getTime();
  };

  return (
    <div className={classes.divCard}>
      <div className={classes.divCardImage}>
        <span className={classes.addedAt}>
          {moment(topicData.date).fromNow()}
        </span>
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

      <Link href={"/article/" + topicData.ArticleID}>
        <a className={classes.cardMore}>اقرأ الآن</a>
      </Link>
    </div>
  );
};
export default Topic;
