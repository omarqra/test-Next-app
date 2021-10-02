import { useRouter } from "next/router";
const TopicPage = () => {
    const router = useRouter();
    const query = router.query;
    console.log(router.query);
    return (
        <div>{`sectionID =>${query.sectionId}   :   TopicID =>${query.topicId}`}</div>
    )
}

export default TopicPage;