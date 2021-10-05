import React, { useEffect, useRef, useState } from "react";
import {
  addSection,
  deleteSection,
  getSections,
  updateSection,
} from "../../../apiRequest/axios";
import SideBare from "../../../components/sideBare/sideBare";
import style from "../../../styles/sections.module.scss";

const Sections = () => {
  const [name, setname] = useState("");

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

  const submit_button = useRef(null);
  async function handleAdd(e) {
    e.preventDefault();
    if (name === "") {
      return setMessage("الرجاء ادخال الاسم");
    }
    submit_button.current.disabled = true;
    submit_button.current.value = "جاري ...";
    try {
      let _data;
      if (update) {
        const { data } = await updateSection(update, { name });
        setUpdate(false);
        _data = data;
      } else {
        const { data } = await addSection({ name });
        _data = data;
      }
      regetSections();
      setMessage(_data.message, "good");
      submit_button.current.value = "إضافة";
      setname("");
      submit_button.current.disabled = false;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        submit_button.current.value = data.message;
      } else {
        setMessage("حصلت مشكلة اثناء التعديل");
      }
      submit_button.current.disabled = false;
      submit_button.current.value = "مشكلة ...";
    }
  }

  const regetSections = async () => {
    try {
      const { data } = await getSections();
      setSections(data);
    } catch (error) {
      setMessage("مشكلة في استدعاء الاقسام");
    }
  };
  const [Sections, setSections] = useState([]);
  useEffect(() => {
    regetSections();
  }, []);

  const [update, setUpdate] = useState(false);

  return (
    <div className={style.Sections_page}>
      <span
        className={style.message}
        ref={message}
        onClick={(e) => {
          e.target.innerHTML = "";
          e.target.style.padding = "0";
        }}
      ></span>
      <SideBare />
      <main>
        <h1>صفحة الأقسام</h1>
        <form
          onSubmit={(e) => {
            handleAdd(e);
          }}
        >
          <h2>{update ? "تعديل القسم" : "إضافة قسم"}</h2>
          <div>
            <input
              placeholder="اسم القسم"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <span
              onClick={() => {
                setUpdate(false);
                setname("");
              }}
            >
              {update && "X"}
            </span>
            <input
              type="submit"
              value={update ? "تعديل " : "إضافة"}
              ref={submit_button}
            />
          </div>
        </form>
        <table>
          <caption>الاقسام الموجودة</caption>
          <thead>
            <tr>
              <th>الرقم</th>
              <th>الاسم</th>
              <th>تعديل</th>
            </tr>
          </thead>
          <tbody>
            {Sections &&
              typeof Sections === "object" &&
              Sections.map((s) => {
                return (
                  <tr key={s.SectionID}>
                    <th>{s.SectionID}</th>
                    <th>{s.name}</th>
                    <th>
                      <button
                        onClick={async (e) => {
                          if (
                            window.confirm(
                              "في حال حذف هذا القسم سيتم حذف كل المقالات التي بداخله"
                            )
                          ) {
                            e.target.disabled = true;
                            try {
                              const { data } = await deleteSection(s.SectionID);
                              regetSections();
                              setMessage(data.message, "good");
                              e.target.disabled = false;
                            } catch (error) {
                              if (error.response) {
                                const { data } = error.response;
                                submit_button.current.value = data.message;
                              } else {
                                setMessage("حصلت مشكلة اثناء التعديل");
                              }
                              e.target.disabled = false;
                            }
                          }
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={(e) => {
                          setUpdate(s.SectionID);
                          setname(s.name);
                        }}
                      >
                        تعديل
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Sections;
