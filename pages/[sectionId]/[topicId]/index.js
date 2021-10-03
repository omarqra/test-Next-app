import { useRouter } from "next/router";
const TopicPage = () => {
    const router = useRouter();
    return (
        <div>{`sectionID =>${query.sectionId}   :   TopicID =>${query.topicId}`}</div>
    )
}

export default TopicPage;