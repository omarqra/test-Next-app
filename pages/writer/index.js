import Head from "next/head";
import style from "../../styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";
import SideBare from "../../components/sideBare/sideBare";
import {
  addWriter,
  deteteWriter,
  getAllWriters,
  updateWriter,
  UploadImage,
} from "../../apiRequest/axios";

export default function Home() {
  const [writer_Image, setwriter_Image] = useState(
    "/images/defult-user-image.svg"
  );
  const [writer_name, setwriter_name] = useState("");
  const [writer_password, setwriter_password] = useState("");

  const [update, setUpdate] = useState(false);

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

  const submit = useRef(null);

  const [users, setUsers] = useState([]);

  const reGetAllWriter = async () => {
    try {
      const { data } = await getAllWriters();
      setUsers(data);
    } catch (error) {
      const { data } = error.response;
      if (data.message === "قم بتسجيل الدخول اولا")
        window.location = "/writer/login";
      return;
    }
  };
  useEffect(() => {
    reGetAllWriter();
  }, []);

  const hundlsubmit = async (e) => {
    e.preventDefault();
    try {
      let data_res;
      if (update) {
        const date_to_update = {};
        if (writer_name !== "") {
          date_to_update.writer_name = writer_name;
        }
        if (
          writer_Image !== "" &&
          writer_Image !== "/images/defult-user-image.svg"
        ) {
          date_to_update.writer_Image = writer_Image;
        }
        if (writer_password !== "") {
          date_to_update.writer_password = writer_password;
        }
        if (
          (writer_Image !== "" &&
            writer_Image !== "/images/defult-user-image.svg") ||
          writer_password !== "" ||
          writer_name !== ""
        ) {
          submit.current.disabled = true;
          const { data } = await updateWriter(date_to_update, update);
          data_res = data;
          setUpdate(false);
        }
      } else {
        if (
          writer_name === "" ||
          writer_password === "" ||
          writer_password.length < 5
        ) {
          setMessage(" يجب ادخال صورة ،واسم ،وكلمة سر اكبر من 5 حروف.");
          return;
        }
        submit.current.disabled = true;

        const { data } = await addWriter({
          writer_Image,
          writer_name,
          writer_password,
        });
        data_res = data;
      }
      setMessage(data_res.message, "جيد");
      submit.current.disabled = false;
      setwriter_Image("/images/defult-user-image.svg");
      setwriter_name("");
      setwriter_password("");
      await reGetAllWriter();
    } catch (error) {
      submit.current.disabled = false;
      const { data } = error.response;
      setMessage(data.message | data);
    }
  };

  const handleImage = async (e) => {
    const Data = new FormData();
    Data.append("image", e.target.files[0]);
    try {
      const { data } = await UploadImage(Data);
      return setwriter_Image(data.imageUrl);
    } catch (error) {
      return console.log({ error });
    }
  };
  return (
    <div className={style.adminMain}>
      <span
        className={style.message}
        ref={message}
        onClick={(e) => {
          e.target.innerHTML = "";
          e.target.style.padding = "0";
        }}
      ></span>
      <Head>
        <title>صفحة الآدمن</title>
        <meta
          name="description"
          content="الصفحة الرسمية لآدمن صفحة خبر ومقال"
        />
        <meta
          name="keywords"
          content="اضافة قسم، حذف قسم، إضافة مساعد، حذف مساعد، تعديل مساع"
        />
      </Head>
      <SideBare />
      <main>
        <div className={style.first}>
          <h1>صفحة الآدمن</h1>
          <h2>إضافة كاتب</h2>
          <form onSubmit={(e) => hundlsubmit(e)}>
            <img
              src={writer_Image}
              alt="صورة الكاتب"
              onClick={() => {
                document.getElementById("image_input").click();
              }}
            />
            <input
              id="image_input"
              type="file"
              hidden
              onChange={(e) => {
                handleImage(e);
              }}
            />
            <div>
              <input
                onChange={(e) => {
                  setwriter_name(e.target.value);
                }}
                value={writer_name}
                name="username"
                type="text"
                placeholder="اسم الكاتب"
              />
              <input
                onChange={(e) => {
                  setwriter_password(e.target.value);
                }}
                value={writer_password}
                type="password"
                name="password"
                autoComplete="on"
                placeholder={
                  update ? "كلمة سر الكاتب ، غير الزامية" : "كلمة سر الكاتب"
                }
              />
            </div>
            <input
              type="submit"
              ref={submit}
              value={update ? "تعديل" : "إضافة"}
            />
            <span
              onClick={() => {
                setUpdate(false);
                setwriter_Image("/images/defult-user-image.svg");
                setwriter_name("");
                setwriter_password("");
              }}
            >
              {update && "X"}
            </span>
          </form>
        </div>
        <div className={style.second}>
          <h2>معلومات الكتاب</h2>
          <table>
            <thead>
              <tr>
                <th>الرقم</th>
                <th>الاسم</th>
                <th>الصورة</th>
                <th>تعديل/حذف</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{item.WriterID}</th>
                      <th>{item.name}</th>
                      <th>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          height="40px"
                        />
                      </th>
                      <th>
                        <div>
                          <button
                            onClick={() => {
                              setUpdate(item.WriterID);
                              setwriter_Image(item.imageUrl);
                              setwriter_name(item.name);
                              setwriter_password("");
                            }}
                          >
                            تعديل
                          </button>
                          <button
                            onClick={async (e) => {
                              e.target.disabled === true;
                              try {
                                const { data } = await deteteWriter(
                                  item.WriterID
                                );
                                setMessage(data.message, "جيد");
                                e.target.disabled === false;
                                await reGetAllWriter();
                              } catch (error) {
                                const { data } = error.response;
                                setMessage(data.message);
                                e.target.disabled === false;
                              }
                            }}
                          >
                            حذف
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
