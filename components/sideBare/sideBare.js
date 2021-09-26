import React from "react";
import style from "./sidebar.module.scss";
import { FaLock, FaBars } from "react-icons/fa";
import Link from "next/link";
import { FaHome, FaPlus, FaTools, FaUserTie } from "react-icons/fa";

const SideBare = () => {
  return (
    <>
      <FaBars
        className={style.bars_icon}
        id="bars_icon"
        onClick={() => {
          if (window.innerWidth > 768) {
            document.getElementById("sidebar").style.width = "20%";
            document.getElementById("sidebar").style.display = "flex";
          } else {
            document.getElementById("sidebar").style.width = "100%";
          }
        }}
      />
      <aside className={style.sidebar} id="sidebar">
        <span
          onClick={() => {
            document.getElementById("sidebar").style.width = 0;
            if (window.innerWidth > 768)
              document.getElementById("sidebar").style.display = "none";
          }}
        >
          X
        </span>
        <ul>
          <FaLock />
          <li>
            <Link href="/">
              <a>
                <FaHome /> - العودة للموقع
              </a>
            </Link>
          </li>
          <li>
            <Link href="/writer">
              <a>
                <FaUserTie /> - صفحة الكتاب
              </a>
            </Link>
          </li>
          <li>
            <Link href="/writer/add">
              <a>
                <FaPlus /> - مقالة جديدة
              </a>
            </Link>
          </li>
          <li>
            <Link href="/writer/writing_tools/update">
              <a>
                <FaTools /> - تعديل او حذف مقال
              </a>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBare;
