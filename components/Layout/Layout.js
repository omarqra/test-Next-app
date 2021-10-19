import Footer from "./Footer/Footer";
import classes from "./Layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSections } from "../../apiRequest/axios";

const Layout = ({ children }) => {
  const [sections, setsections] = useState([]);
  useEffect(() => {
    (async () => {
      if (window.localStorage.getItem("sections"))
        setsections(JSON.parse(localStorage.getItem("sections")));
      try {
        const { data } = await getSections();
        setsections(data);
        window.localStorage.setItem("sections", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className={classes.navContent}>
            <Link href="/">
              <a>
                <h1 className={classes.navContentHeader}>خبر ومقال</h1>
              </a>
            </Link>

            {/* DropDown */}
            <div className={classes.dropdown}>
              <span> التصنيفات </span>
              <ul className={classes.dropdownList}>
                {sections.map((section) => {
                  return (
                    <li key={section.SectionID}>
                      <Link href={"/section/" + section.SectionID}>
                        <a>{section.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
