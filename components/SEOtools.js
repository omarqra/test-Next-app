import React, { useState } from "react";
import style from "../styles/seotools.module.scss";

export const SEOtools = () => {
  const [keyWorld, setkeyWorld] = useState("");
  const [title_tag, settitle_tag] = useState("");
  const [description, setdescription] = useState("");
  console.log(keyWorld);
  return (
    <div className={style.seotools}>
      <div className={style.inputs}>
        <input
          placeholder="الكلمة الرئيسية ..."
          value={keyWorld}
          onChange={(e) => {
            setkeyWorld(e.target.value);
          }}
        />
        <input
          placeholder="عنوان الصفحة ..."
          value={title_tag}
          onChange={(e) => {
            settitle_tag(e.target.value);
          }}
        />
        <input
          placeholder="وصف الصفحة ..."
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
      </div>
      <div className={style.preview}>
        <div className={style.preview_url}>
          sample-url ‹ example.com <span className="mn-dwn-arw"></span>
        </div>
        <div className={style.preview_title}>
          {title_tag === "" ? " هذا عبارة عن مثال لعنوان الصفحة" : title_tag}
        </div>
        <div className={style.preview_content}>
          {description === ""
            ? " استخدم مربع الادخال لكتابة عنوان ووصف للصفحة. هذا المربع يظهر لك كيف ستبدوا هذه الصفحة في بحث جوجل."
            : description}
        </div>
      </div>
    </div>
  );
};
