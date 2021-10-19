import Topic from "./Topic";
import classes from "./TopicsList.module.css";
const TopicsList = (data) => {
  const { topics } = data;

  return (
    <ul className={classes.topicsList}>
      {topics &&
        topics.map((topic, index) => (
          <li key={index}>
            <Topic topicData={topic} />
          </li>
        ))}
    </ul>
  );
};

export default TopicsList;
