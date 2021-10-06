import React, { useRef, useState } from "react";
import { UploadImage } from "../../apiRequest/axios";
import style from "./seotools.module.scss";

const red = "#f97a7a";
const green = "#79bf7e";
const orange = "#eec066";

export const SEOtools = ({
  keyword,
  setkeyWord,
  setimage_url,
  image_url,
  title_tag,
  settitle_tag,
  description,
  setdescription,
}) => {
  return (
    <>
      <div className={style.inputs}>
        <input
          placeholder="الكلمة الرئيسية ..."
          value={keyword}
          onChange={(e) => {
            setkeyWord(e.target.value);
          }}
          onFocus={(e) => {
            const childHeight =
              e.target.nextElementSibling.firstChild.clientHeight;
            e.target.nextElementSibling.style.height = `${childHeight}px`;
          }}
          onBlur={(e) => {
            e.target.nextElementSibling.style.height = "0px";
          }}
        />
        <div>
          <p>
            الكلمة الرئيسية هل المصطلح الذي تريد ان يتم تصنيف مقالك بحسبه في
            محركات البحث، بحيث عندما يبحث المستخدمون عن هذه الكلمة فهم في الغالب
            سيجدون المقال الخاص بك.
          </p>
        </div>
        <input
          placeholder="عنوان الصفحة ..."
          value={title_tag}
          onChange={(e) => {
            settitle_tag(e.target.value);
          }}
          onFocus={(e) => {
            const childHeight =
              e.target.nextElementSibling.firstChild.clientHeight;
            e.target.nextElementSibling.style.height = `${childHeight}px`;
          }}
          onBlur={(e) => {
            e.target.nextElementSibling.style.height = "0px";
          }}
        />
        <div>
          <ul>
            <li>
              <span
                style={{
                  backgroundColor:
                    title_tag.indexOf(keyword) === -1 || keyword === ""
                      ? red
                      : green,
                }}
              ></span>
              {title_tag.indexOf(keyword) === -1 || keyword === ""
                ? `الكلمة المفتاحية (${keyword}) لا تظهر في عنوان الصفحة.`
                : `الكلمة المفتاحية (${keyword}) مستخدمة في عنوان الصفحة.`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    title_tag.indexOf(keyword) > 30 ||
                    keyword === "" ||
                    title_tag.indexOf(keyword) === -1
                      ? red
                      : green,
                }}
              ></span>
              {-1 < title_tag.indexOf(keyword) &&
              title_tag.indexOf(keyword) < 30
                ? `الكلمة المفتاحية (${keyword}) مستخدمة في بداية العنوان.`
                : `الكلمة المفتاحية (${keyword}) لا تظهر في بداية العنوان.`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    title_tag.length > 60 || title_tag.length === 0
                      ? red
                      : title_tag.length < 30
                      ? orange
                      : green,
                }}
              ></span>
              {title_tag.length > 60
                ? `العنوان المستخدم طويل جداً الحروف المتاحة ${
                    60 - title_tag.length
                  } حرف، ${title_tag.length} من 60 مستخدمة. `
                : title_tag.length < 60
                ? `العنوان المستخدم قصير جداً، الحروف المتاحة ${
                    60 - title_tag.length
                  } حرف، ${title_tag.length} من 60 مستخدمة. `
                : `العنوان المستخدم ممتاز، الحروف المتاحة ${
                    60 - title_tag.length
                  } حرف، ${title_tag.length} من 60 مستخدمة. `}
            </li>
          </ul>
        </div>
        <input
          placeholder="وصف الصفحة ..."
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          onFocus={(e) => {
            const childHeight =
              e.target.nextElementSibling.firstChild.clientHeight;
            e.target.nextElementSibling.style.height = `${childHeight}px`;
          }}
          onBlur={(e) => {
            e.target.nextElementSibling.style.height = "0px";
          }}
        />
        <div>
          <ul>
            <li>
              <span
                style={{
                  backgroundColor:
                    description.indexOf(keyword) === -1 || keyword === ""
                      ? red
                      : green,
                }}
              ></span>
              {description.indexOf(keyword) === -1 || keyword === ""
                ? `الكملة الفمتاحية (${keyword}) لا تظهر في وصف الصفحة`
                : `الكملة المفتاحية (${keyword}) مستخدمة في وصف الصفحة`}
            </li>
            <li>
              <span
                style={{
                  backgroundColor:
                    description.length === 0
                      ? red
                      : description.length < 100 || description.length > 160
                      ? orange
                      : green,
                }}
              ></span>
              {description.length < 100
                ? `الوصف المستخدم قصير جداً، الحروف المتاحة ${
                    160 - description.length
                  } حرف، ${description.length} من 160 مستخدمة. `
                : description.length > 160
                ? `الوصف المستخدم طويل جداً، الحروف المتاحة ${
                    160 - description.length
                  } حرف، ${description.length} من 160 مستخدمة. `
                : `الوصف المستخدم ممتاز، الحروف المتاحة ${
                    160 - description.length
                  } حرف، ${description.length} من 160 مستخدمة. `}
            </li>
          </ul>
        </div>
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
            ? " استخدم مربع الادخال لكتابة عنوان ووصف للصفحة. هذه الفقرة تظهر لك كيف ستبدوا هذه الصفحة في بحث جوجل."
            : description}
        </div>
      </div>
      <div className={style.article_image}>
        <span>
          <img
            src={image_url}
            alt="عارض صورة المقال"
            onClick={(e) => {
              e.target.parentNode.nextSibling.click();
            }}
          />
        </span>
        <input
          hidden
          type="file"
          onChange={async (e) => {
            const Data = new FormData();
            Data.append("image", e.target.files[0]);
            try {
              const { data } = await UploadImage(Data);
              setimage_url(data.imageUrl);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </>
  );
};
