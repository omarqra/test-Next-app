import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "../../../styles/textEditer.module.scss";
import {
  addarticle,
  getSections,
  UploadImage,
} from "../../../apiRequest/axios";
import draftToHtml from "draftjs-to-html";
import SideBare from "../../../components/sideBare/sideBare";
import { SEOtools } from "../../../components/SEOtools/SEOtools";
import { FaExpandArrowsAlt, FaWindowClose } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import { useRouter } from "next/router";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
const red = "#f97a7a";
const green = "#79bf7e";
const orange = "#eec066";

let htmlContent = "";
let RowsContent = [];
let keyworld_In_P = false;
let keyworld_In_H1 = false;
let keyWorld_count = 0;
let keyWorld_density = 0;
let linksCount = 0;

let sections;
export default function ADD() {
  const router = useRouter();

  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [keyword, setkeyWord] = useState("");
  const [section, setsection] = useState("");
  const [contentWorlds, setcontentWorlds] = useState(0);
  const [image_url, setimage_url] = useState(
    "/images/defult_article_image.png"
  );
  const [title_tag, settitle_tag] = useState("");
  const [description, setdescription] = useState("");
  const [render, setRender] = useState(0);

  const text_editer = useRef(null);
  const close_icone = useRef(null);
  const articleview = useRef(null);

  useEffect(() => {
    if (!sections) {
      try {
        (async () => {
          const { data } = await getSections();
          sections = data;
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

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
          if (item.text.indexOf(keyword) !== -1) {
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
        if (allP[0].text.indexOf(keyword) !== -1) {
          if (keyword === "") {
            status = false;
          } else {
            status = true;
          }
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
      } else {
        linksCount = 0;
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

      if (keyword !== "") {
        keyWorld_count = world_With_Space.filter(
          (item) => item === keyword
        ).length;
        keyWorld_density = Math.round((keyWorld_count / contentWorlds) * 100);
      } else {
        keyWorld_density = 0;
      }
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
        <h1>إضافة مقالة</h1>
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
          <span ref={close_icone} className={style.close_icone} hidden>
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
        <div className={style.extend}>
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
        </div>
        <div
          className={style.seotools}
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
            setRender(render + 1);
          }}
        >
          <SEOtools
            keyword={keyword}
            setkeyWord={setkeyWord}
            image_url={image_url}
            setimage_url={setimage_url}
            title_tag={title_tag}
            settitle_tag={settitle_tag}
            description={description}
            setdescription={setdescription}
          />

          <ul>
            <li>
              <select
                onChange={(e) => {
                  setsection(e.target.value);
                }}
              >
                <option value="" hidden>
                  اختر القسم ...
                </option>

                {sections &&
                  sections.map((s, i) => {
                    return (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    );
                  })}
              </select>
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    htmlContent.indexOf("<h1>") === -1 ? red : green,
                }}
              ></span>
              {htmlContent.indexOf("<h1>") === -1
                ? "يجب عليك إضافة H1"
                : "قمت بإضافة H1"}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: !keyworld_In_H1 ? red : green,
                }}
              ></span>
              {keyworld_In_H1
                ? `الكلمة المفتاحية (${keyword}) مستخدمة في الـ H1.`
                : `الكلمة المفتاحية (${keyword}) غير موجودة في H1`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: contentWorlds < 2 ? red : green,
                }}
              ></span>
              {contentWorlds > 2 ? `يجب إضافة نص إلى المقال` : `اضفت نص للمقال`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    contentWorlds < 150
                      ? red
                      : contentWorlds < 300
                      ? orange
                      : green,
                }}
              ></span>
              {contentWorlds < 150
                ? `عدد الكلمات في المقال قليل جداً، ${contentWorlds} كلمة، عدد الكلمات الأدنى 300 كلمة.`
                : `عدد كلمات المقال ${contentWorlds}`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: keyworld_In_P ? green : red,
                }}
              ></span>
              {keyworld_In_P
                ? `الكلمة الرئيسية (${keyword}) مستخدمة في الفقرة الأولى للمقال`
                : `الكلمة الرئيسية (${keyword}) لا تظهر في الفقرة الأولى للمقال`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: keyWorld_density < 1 ? red : green,
                }}
              ></span>
              {keyWorld_density < 1
                ? `يجب ان تستخدم الكلمة المفتاحية (${keyword}) اكثر في الصفحة، لتحسين كثافة الكلمة المفتاحية، الكثافة حالياً ${keyWorld_density}`
                : `كثافة الكلمات المفتاحية ممتازة، الكثافة الكالية(${keyWorld_density}%)، الكلمة المفتاحية (${keyword}) مستخدمة عدد ${keyWorld_count} من المرات.`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: linksCount === 0 ? red : green,
                }}
              ></span>
              {linksCount > 0
                ? `لقد قمت بإضافة عدد ${linksCount} من الروابط إلى المقال.`
                : `قم بإضافة روابط لمقالات مشابهة أو مراجع لتحسين تجربة المستخدم.`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    image_url === "/images/defult_article_image.png"
                      ? red
                      : green,
                }}
              ></span>
              {image_url !== "/images/defult_article_image.png"
                ? `قمت بإضافة صورة`
                : `يجب إضافة صورة`}
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            articleview.current.style.display = "block";
          }}
        >
          معاينة المقالة
        </button>

        <div ref={articleview} className={style.layout}>
          <div className={style.nave}>
            <span>المطرجي</span>
            <span>التصنيفات</span>
          </div>
          <FaWindowClose
            onClick={() => {
              articleview.current.style.display = "none";
            }}
          />
          <article>
            <h1>{title_tag}</h1>
            <div className={style.data_and_watch}>
              <span>الآن</span>
              <span>0 مشاهدة</span>
            </div>
            <div className={style.main_img}>
              <img src={image_url} />
            </div>
            <div className={style.mainContext}>
              {ReactHtmlParser(
                htmlContent !== ""
                  ? htmlContent.replaceAll("<p></p>", "</br>")
                  : ""
              )}
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "larger",
                margin: "50px 15px",
              }}
            >
              كاتب المقال : محمد مطرجي
            </p>
          </article>
          <div className={style.button}>
            <button
              onClick={async (e) => {
                const keys = [
                  title_tag,
                  image_url,
                  description,
                  htmlContent,
                  keyword,
                  section,
                ];
                let missing_Data = false;
                keys.forEach((item) => {
                  if (!item || item === "") {
                    missing_Data = true;
                  }
                });
                if (missing_Data) {
                  return setMessage(
                    "يجب ادخال كل من العنوان والوصف و المقال و الكلمة الرئيسية"
                  );
                }
                try {
                  e.target.disabled = true;
                  e.target.innerHTML = "جاري النشر";
                  const { data } = await addarticle({
                    title: title_tag,
                    imageurl: image_url,
                    description,
                    htmlcontent: htmlContent.replaceAll("<p></p>", "</br>"),
                    keyword,
                    section,
                  });
                  setMessage(data.message, "good");
                  return router.push("/writer");
                } catch (error) {
                  if (error.response) {
                    const { data } = error.response;
                    setMessage(data.message);
                  } else {
                    setMessage("حصلت مشكلة اثناء التعديل");
                  }
                  e.target.innerHTML = "مشكلة ...";
                  e.target.disabled = false;
                }
              }}
            >
              نشر
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
