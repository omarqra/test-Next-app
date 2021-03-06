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

export default function ADD() {
  const router = useRouter();

  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [keyword, setkeyWord] = useState("");
  const [section, setsection] = useState(0);
  const [sections, setsections] = useState(false);
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
          setsections(data);
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
      if (error.response) {
        const { data } = error.response;
        if (data.message === "???? ???????????? ???????????? ????????") {
          window.location = "/writer/login";
        }
      } else {
        setMessage("?????????? ???? ?????? ????????????");
      }
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

      const reg = new RegExp(keyword.trim(), "g");
      const world_With_Space = str1.replace(reg, "keyword").split(" ");
      const count = world_With_Space.length;
      if (count !== contentWorlds) setcontentWorlds(count);
      if (keyword !== "") {
        keyWorld_count = world_With_Space.filter(
          (item) => item === "keyword"
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
        <title>?????????? ??????????</title>
        <meta name="description" content="???????? ?????????? ?????????????? ?????????? ?????? ??????????" />
        <meta name="keywords" content="?????????? ?????????? , ??????????" />
      </Head>
      <SideBare />
      <main>
        <h1>?????????? ??????????</h1>
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
                  ???????? ?????????? ...
                </option>

                {sections &&
                  typeof sections === "object" &&
                  sections.map((s, i) => {
                    return (
                      <option key={i} value={s.SectionID}>
                        {s.name}
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
                ? "?????? ???????? ?????????? H1"
                : "?????? ???????????? H1"}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: !keyworld_In_H1 ? red : green,
                }}
              ></span>
              {keyworld_In_H1
                ? `???????????? ?????????????????? (${keyword}) ?????????????? ???? ?????? H1.`
                : `???????????? ?????????????????? (${keyword}) ?????? ???????????? ???? H1`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: contentWorlds < 2 ? red : green,
                }}
              ></span>
              {contentWorlds > 2 ? `?????? ?????????? ???? ?????? ????????????` : `???????? ???? ????????????`}
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
                ? `?????? ?????????????? ???? ???????????? ???????? ?????????? ${contentWorlds} ?????????? ?????? ?????????????? ???????????? 300 ????????.`
                : `?????? ?????????? ???????????? ${contentWorlds}`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: keyworld_In_P ? green : red,
                }}
              ></span>
              {keyworld_In_P
                ? `???????????? ???????????????? (${keyword}) ?????????????? ???? ???????????? ???????????? ????????????`
                : `???????????? ???????????????? (${keyword}) ???? ???????? ???? ???????????? ???????????? ????????????`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: keyWorld_density < 1 ? red : green,
                }}
              ></span>
              {keyWorld_density < 1
                ? `?????? ???? ???????????? ???????????? ?????????????????? (${keyword}) ???????? ???? ?????????????? ???????????? ?????????? ???????????? ???????????????????? ?????????????? ???????????? ${keyWorld_density}`
                : `?????????? ?????????????? ?????????????????? ?????????????? ?????????????? ??????????????(${keyWorld_density}%)?? ???????????? ?????????????????? (${keyword}) ?????????????? ?????? ${keyWorld_count} ???? ????????????.`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor: linksCount === 0 ? red : green,
                }}
              ></span>
              {linksCount > 0
                ? `?????? ?????? ???????????? ?????? ${linksCount} ???? ?????????????? ?????? ????????????.`
                : `???? ???????????? ?????????? ?????????????? ???????????? ???? ?????????? ???????????? ?????????? ????????????????.`}
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
                ? `?????? ???????????? ????????`
                : `?????? ?????????? ????????`}
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            articleview.current.style.display = "block";
          }}
        >
          ???????????? ??????????????
        </button>

        <div ref={articleview} className={style.layout}>
          <div className={style.nave}>
            <span>??????????????</span>
            <span>??????????????????</span>
          </div>
          <FaWindowClose
            onClick={() => {
              articleview.current.style.display = "none";
            }}
          />
          <article>
            <h1>{title_tag}</h1>
            <div className={style.data_and_watch}>
              <span>????????</span>
              <span>0 ????????????</span>
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
              ???????? ???????????? : ???????? ??????????
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
                    "?????? ?????????? ???? ???? ?????????????? ???????????? ?? ???????????? ?? ???????????? ????????????????"
                  );
                }
                try {
                  e.target.disabled = true;
                  e.target.innerHTML = "???????? ??????????";
                  const { data } = await addarticle({
                    title: title_tag,
                    imageurl: image_url,
                    description,
                    htmlcontent: htmlContent.replaceAll("<p></p>", "</br>"),
                    keyword,
                    SectionID: section,
                  });
                  setMessage(data.message, "good");
                  return router.push("/writer/articles/update");
                } catch (error) {
                  if (error.response) {
                    const { data } = error.response;
                    setMessage(data.message);
                  } else {
                    setMessage("???????? ?????????? ?????????? ??????????");
                  }
                  e.target.innerHTML = "?????????? ...";
                  e.target.disabled = false;
                }
              }}
            >
              ??????
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
