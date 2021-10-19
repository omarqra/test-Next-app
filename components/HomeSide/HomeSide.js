import Link from "next/link";
import classes from "./HomeSide.module.css";
import image_1 from "../../public/facebook.svg";
import image_2 from "../../public/instagram.svg";
import image_3 from "../../public/twittar.svg";
const HomeSide = () => {
  return (
    <aside className={classes.homeSide}>
      <ul className={classes.socialList}>
        <li>
          <img src={image_1.src} alt="facebook" />
          <a href="https://www.facebook.com/" target="_blank">
            {" "}
            @المطرجي
          </a>
        </li>
        <li>
          <img src={image_3.src} alt="facebook" />
          <a href="https://www.twitter.com/" target="_blank">
            {" "}
            @موقع المطرجي{" "}
          </a>
        </li>
        <li>
          <img src={image_2.src} alt="facebook" />
          <a href="https://www.instagram.com/" target="_blank">
            {" "}
            mutraji221@{" "}
          </a>
        </li>
      </ul>
      <ul className={classes.linksList}>
        <li>
          <Link href="/about">
            <a className={classes.link}>من نحن</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={classes.link}>سياسة الخصوصية</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={classes.link}>شروط الاستخدام</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={classes.link}>اتصل بنا</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default HomeSide;
