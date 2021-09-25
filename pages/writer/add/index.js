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

export default function ADD() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
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
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
        <SEOtools />
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
      </main>
    </div>
  );
}
