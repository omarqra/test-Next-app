import Head from "next/head";
import style from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import SideBare from "../components/sideBare";
import { addWriter, getAllWriters, UploadImage } from "../apiRequest/axios";

export default function Home() {
  const [writer_Image, setwriter_Image] = useState(
    "/images/defult-user-image.svg"
  );
  const [writer_name, setwriter_name] = useState("");
  const [writer_password, setwriter_password] = useState("");

  const [users, setUsers] = useState([
    {
      userID: 205,
      userName: "omar",
      userImage: "nana",
    },
    {
      userID: 205,
      userName: "omar",
      userImage: "nana",
    },
    {
      userID: 205,
      userName: "omar",
      userImage: "nana",
    },
  ]);

  useEffect(() => {
    (async () => {
      if (users.length > 0) {
        return;
      }
      try {
        const { data } = await getAllWriters();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const hundlsubmit = async (e) => {
    e.preventDefault();
    const { data } = await getAllWriters();
    console.log(data);
    // if (
    //   writer_Image === "/images/defult-user-image.svg" ||
    //   writer_name === "" ||
    //   writer_password === ""
    // ) {
    //   return;
    // }
    // try {
    //   const { data } = await addWriter({
    //     writer_Image,
    //     writer_name,
    //     writer_password,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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
            <input type="submit" />
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
              {users.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.userID}</th>
                    <th>{item.userName}</th>
                    <th>{item.userImage}</th>
                    <th>
                      <div>
                        <button>تعديل</button>
                        <button>حذف</button>
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
