import Topic from "./Topic";
import classes from "./TopicsList.module.css";
const TopicsList = (data) => {
    const topics = data.topics;
    return (
        <ul className={classes.topicsList}>
            {
                topics.map(topic => <li key={topic.id}><Topic topicData={topic} /></li>)
            }
        </ul>
    )
}

export default TopicsList;