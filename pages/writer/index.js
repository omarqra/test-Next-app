import Head from "next/head";
import style from "../../styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";
import SideBare from "../../components/sideBare";
import {
  addWriter,
  deleteImage,
  deteteWriter,
  getAllWriters,
  UploadImage,
} from "../../apiRequest/axios";

export default function Home() {
  const [writer_Image, setwriter_Image] = useState(
    "/images/defult-user-image.svg"
  );
  const [writer_name, setwriter_name] = useState("");
  const [writer_password, setwriter_password] = useState("");

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
      console.log(error);
    }
  };
  useEffect(() => {
    reGetAllWriter();
  }, []);

  const hundlsubmit = async (e) => {
    e.preventDefault();
    if (
      writer_name === "" ||
      writer_password === "" ||
      writer_password.length < 5
    ) {
      setMessage(" يجب ادخال صورة ،واسم ،وكلمة سر اكبر من 5 حروف.");
      return;
    }
    submit.current.disabled = true;
    try {
      const { data } = await addWriter({
        writer_Image,
        writer_name,
        writer_password,
      });
      setMessage(data.message, "جيد");
      submit.current.disabled = false;
      setwriter_Image("/images/defult-user-image.svg");
      setwriter_name("");
      setwriter_password("");
      await reGetAllWriter();
    } catch (error) {
      console.log(error);
      submit.current.disabled = false;
      setMessage(error.message);
    }
  };
  const handleImage = async (e) => {
    const Data = new FormData();
    Data.append("image", e.target.files[0]);
    try {
      const { data } = await UploadImage(Data);
      setwriter_Image(data.imageUrl);
    } catch (error) {
      console.log(error);
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
                type="text"
                placeholder="اسم الكاتب"
              />
              <input
                onChange={(e) => {
                  setwriter_password(e.target.value);
                }}
                value={writer_password}
                type="password"
                placeholder="كلمة سر الكاتب"
              />
            </div>
            <input type="submit" ref={submit} />
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
                          <button>تعديل</button>
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
                                setMessage("حدثت مشكلة اثناء حذف الكاتب");
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
