import { useRouter } from "next/router";
import TopicsList from "../../components/Topics/TopicsList";
import HomeSide from "../../components/HomeSide/HomeSide";
import classes from "../../styles/homePage.module.css";
import { find_section, get_section_Articles } from "../../apiRequest/axios";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { sectionsId } = context.query;
  const { data: section } = await find_section(sectionsId);
  const { data } = await get_section_Articles({ S: sectionsId });
  return {
    props: { sectionsId, data, section },
  };
}

const Section = ({ data, section }) => {
  const [topics, settopics] = useState(data);
  useEffect(() => {
    settopics(data);
  }, [data]);

  return (
    <div>
      <span className={classes.header_1}>قسم {section.name}</span>
      <div className={classes.homeSideAndTopics}>
        <TopicsList topics={topics} />
        <HomeSide />
      </div>
      <button
        onClick={async (e) => {
          try {
            e.target.disabled = true;
            e.target.innerHTML = "جاري التحميل ...";

            const { data } = await get_section_Articles({
              M: topics.length,
              S: section.SectionID,
            });
            settopics([...topics, ...data]);
            e.target.disabled = false;
            e.target.innerHTML = "المزيد";
          } catch (error) {
            e.target.innerHTML = "مشكلة في التحميل";
            e.target.disabled = false;

            console.log(error);
          }
        }}
        className={classes.MoreLink}
      >
        المزيد
      </button>
    </div>
  );
};

export default Section;
