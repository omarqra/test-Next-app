import React, { useEffect, useState } from "react";
import style from "./sidebar.module.scss";
import { FaLock, FaBars } from "react-icons/fa";
import Link from "next/link";
import { FaHome, FaPlus, FaTools, FaUserTie } from "react-icons/fa";

const SideBare = () => {
  const [admin, setadmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token_1")) {
      setadmin(true);
    }
  }, []);
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
          {admin && (
            <li>
              <Link href="/writer">
                <a>
                  <FaUserTie /> - صفحة الكتاب
                </a>
              </Link>
            </li>
          )}
          {admin && (
            <li>
              <Link href="/writer/sections">
                <a>
                  <FaUserTie /> - صفحة الاقسام
                </a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/writer/articles/add">
              <a>
                <FaPlus /> - مقالة جديدة
              </a>
            </Link>
          </li>
          <li>
            <Link href="/writer/articles/update">
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
