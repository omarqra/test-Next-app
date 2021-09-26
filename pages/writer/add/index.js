import React, { useRef, useState } from "react";
import Head from "next/head";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "../../../styles/textEditer.module.scss";
import { UploadImage } from "../../../apiRequest/axios";
import draftToHtml from "draftjs-to-html";
import SideBare from "../../../components/sideBare/sideBare";
import { SEOtools } from "../../../components/SEOtools/SEOtools";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
let htmlContent = "";
let RowsContent = [];
let contentlength = 0;

export default function ADD() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [keyWorld, setkeyWorld] = useState("");
  const [contentWorlds, setcontentWorlds] = useState(0);
  const message = useRef(null);
  const setMessage = (M, good) => {
    message.current.style.padding = "20px";
    message.current.innerHTML = M;
    if (good) {
      message.current.style.backgroundColor = "green";
    } else {
      message.current.style.backgroundColor = "#cf2e2e";
    }
  };

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
    RowsContent = convertToRaw(editorState.getCurrentContent());
    htmlContent = draftToHtml(RowsContent);
    if (RowsContent.blocks) {
      countWorlds();
    }
  };

  const uploadImageCallBack = async (file) => {
    const Data = new FormData();
    Data.append("image", file);
    try {
      const { data } = await UploadImage(Data);
      return Promise.resolve({
        data: {
          link: data.imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const chack_H1_For_keyworld = () => {
    let status = false;
    if (RowsContent.blocks) {
      RowsContent.blocks.forEach((item) => {
        if (item.type === "header-one") {
          if (item.text.indexOf(keyWorld) !== -1) {
            status = true;
          }
        }
      });
    }
    return status;
  };
  const chack_p_For_keyworld = () => {
    let status = false;
    if (RowsContent.blocks) {
      RowsContent.blocks.forEach((item) => {
        if (item.type === "unstyled") {
          if (item.text.indexOf(keyWorld) !== -1) {
            status = true;
          }
        }
      });
    }
    return status;
  };

  const countWorlds = () => {
    if (RowsContent.blocks) {
      let alltexts = "";
      RowsContent.blocks.forEach((item) => {
        alltexts = alltexts.concat(` ${item.text} `);
      });
      let str1 = alltexts;
      str1 = str1.replace(/(^\s*)|(\s*$)/gi, "");
      str1 = str1.replace(/[ ]{2,}/gi, " ");
      str1 = str1.replace(/\n /, "\n");
      setcontentWorlds(str1.split(" ").length);
    }
  };
  return (
    <div className={style.textEditer}>
      <span
        className={style.message}
        ref={message}
        onClick={(e) => {
          e.target.innerHTML = "";
          e.target.style.padding = "0";
        }}
      ></span>
      <Head>
        <title>إضافة مقالة</title>
        <meta name="description" content="صفحة إضافة المقالة لموقع خبر ومقال" />
        <meta name="keywords" content="اضافة مقالة , مقالة" />
      </Head>
      <SideBare />
      <main
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            countWorlds(e);
          }
        }}
        onFocus={(e) => {
          countWorlds(e);
        }}
      >
        <SEOtools keyWorld={keyWorld} setkeyWorld={setkeyWorld} />
        <Editor
          editorState={editorState}
          toolbarClassName={style.toolbar_class}
          wrapperClassName={style.wrapper_class}
          editorClassName={style.editer_class}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: false, mandatory: false },
            },
          }}
        />
        <ul>
          <li>
            {htmlContent.indexOf("<h1>") === -1
              ? "يجب عليك إضافة H1"
              : "قمت بإضافة H1"}
          </li>
          <li>
            {chack_H1_For_keyworld()
              ? `الكلمة المفتاحية ${keyWorld} مستخدمة موجودة في H1`
              : `الكلمة المفتاحية ${keyWorld} غير موجودة في H1`}
          </li>
          <li>
            {contentlength === 0 ? `يجب إضافة نص إلى المقال` : `اضفت نص للمقال`}
          </li>
          <li>
            {contentWorlds < 150
              ? `عدد الكلمات في المقال قليل جداً، عدد الكلمات الأدنى 300 حرف`
              : `عدد كلمات المقال ${contentWorlds}`}
          </li>
          <li>
            {contentWorlds < 150
              ? `الكلمة الرئيسية ${keyWorld} لا تظهر في الفقرة الأولى للمقال`
              : `عدد كلمات المقال ${contentWorlds}`}
          </li>
        </ul>
      </main>
    </div>
  );
}
