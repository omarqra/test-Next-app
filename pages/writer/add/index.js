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
import { FaExpandArrowsAlt, FaWindowClose } from "react-icons/fa";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

let htmlContent = "";
let RowsContent = [];
let keyworld_In_P = false;
let keyworld_In_H1 = false;
let keyWorld_count = 0;
let keyWorld_density = 0;
let linksCount = 0;

export default function ADD() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [keyWorld, setkeyWorld] = useState("");
  const [contentWorlds, setcontentWorlds] = useState(0);

  const text_editer = useRef(null);
  const close_icone = useRef(null);

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
    keyworld_In_H1 = status;
  };

  const chack_p_For_keyworld = () => {
    let status = false;
    if (RowsContent.blocks) {
      const allP = RowsContent.blocks.filter(
        (item) => item.type === "unstyled"
      );
      if (allP[0]) {
        if (allP[0].text.indexOf(keyWorld) !== -1) {
          status = true;
        }
      }
    }
    keyworld_In_P = status;
  };

  const chack_for_Links = () => {
    if (RowsContent.entityMap) {
      if (RowsContent.entityMap[0]) {
        const arr = Object.values(RowsContent.entityMap);
        linksCount = arr.filter((item) => item.type === "LINK").length;
      }
    }
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

      const world_With_Space = str1.split(" ");
      const count = world_With_Space.length;
      if (count !== contentWorlds) setcontentWorlds(count);

      keyWorld_count = world_With_Space.filter(
        (item) => item === keyWorld
      ).length;
      keyWorld_density = Math.round((keyWorld_count / contentWorlds) * 100);
    }
  };
  console.log(RowsContent.entityMap);
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
      <main>
        <SEOtools keyWorld={keyWorld} setkeyWorld={setkeyWorld} />
        <div
          ref={text_editer}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              countWorlds();
              chack_p_For_keyworld();
              chack_H1_For_keyworld();
              chack_for_Links();
            }
          }}
          onClick={() => {
            countWorlds();
            chack_p_For_keyworld();
            chack_H1_For_keyworld();
            chack_for_Links();
          }}
        >
          <span ref={close_icone} className={style.close_icone}>
            <FaWindowClose
              onClick={() => {
                const style = text_editer.current.style;
                style.position = "relative";
                style.width = "auto";
                style.height = "auto";
                style.top = "";
                style.left = "";
                style.zIndex = "";
                close_icone.current.style.display = "none";
              }}
            />
          </span>
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
                alt: { present: true, mandatory: true },
              },
            }}
          />
        </div>
        <ul>
          <FaExpandArrowsAlt
            onClick={() => {
              const style = text_editer.current.style;
              style.position = "fixed";
              style.width = "100%";
              style.height = "100%";
              style.top = "0";
              style.left = "0";
              style.zIndex = "3";
              close_icone.current.style.display = "block";
            }}
          />
          <li>
            {htmlContent.indexOf("<h1>") === -1
              ? "يجب عليك إضافة H1"
              : "قمت بإضافة H1"}
          </li>
          <li>
            {keyworld_In_H1
              ? `الكلمة المفتاحية (${keyWorld}) مستخدمة موجودة في H1`
              : `الكلمة المفتاحية (${keyWorld}) غير موجودة في H1`}
          </li>
          <li>
            {contentWorlds === 1 ? `يجب إضافة نص إلى المقال` : `اضفت نص للمقال`}
          </li>
          <li>
            {contentWorlds < 150
              ? `عدد الكلمات في المقال قليل جداً، ${contentWorlds} كلمة، عدد الكلمات الأدنى 300 كلمة.`
              : `عدد كلمات المقال ${contentWorlds}`}
          </li>
          <li>
            {keyworld_In_P
              ? `الكلمة الرئيسية (${keyWorld}) مستخدمة في الفقرة الأولى للمقال`
              : `الكلمة الرئيسية (${keyWorld}) لا تظهر في الفقرة الأولى للمقال`}
          </li>
          <li>
            {keyWorld_density < 1
              ? `يجب ان تستخدم الكلمة المفتاحية (${keyWorld}) اكثر في الصفحة، لتحسين كثافة الكلمة المفتاحية، الكثافة حالياً ${keyWorld_density}`
              : `كثافة الكلمات المفتاحية ممتازة، الكثافة الكالية(${keyWorld_density}%)، الكلمة المفتاحية (${keyWorld}) مستخدمة عدد ${keyWorld_count} من المرات.`}
          </li>
          <li>
            {linksCount > 0
              ? `لقد قمت بإضافة عدد ${linksCount} من الروابط إلى المقال.`
              : `قم بإضافة روابط لمقالات مشابهة أو مراجع لتحسين تجربة المستخدم.`}
          </li>
        </ul>
      </main>
    </div>
  );
}

{
  /* <li>{have_img ? `قمت بإضافة صورة` : `يجب إضافة صورة`}</li>
          <li>
            {have_img
              ? `الكلمة المفتاحية ${keyWorld} غير مذكورة في النص البديل للصورة`
              : `الكلمة المفتاحية ${keyWorld} مستخدمة في النص البديل للصورة`}
          </li> */
}
