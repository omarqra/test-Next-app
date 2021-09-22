import React from "react";
import style from "../styles/sidebar.module.scss";
import { FaLock, FaBars } from "react-icons/fa";
import Link from "next/link";

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
            <Link href="/admin_Panel">
              <a>الصفحة الرئيسية</a>
            </Link>
          </li>
          <li>
            <Link href="/Writer/writing_tools/add">
              <a>مقالة جديدة</a>
            </Link>
          </li>
          <li>
            <Link href="/Writer/writing_tools/update">
              <a> تعديل او حذف مقال</a>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBare;
