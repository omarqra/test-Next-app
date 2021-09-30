import classes from "./Footer.module.css";
import Link from "next/link";
import footerImg from "../../../public/images/footer/footer.png"
const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerLists}>
                <div className={classes.imgDiv}><img  className={classes.image} src={footerImg.src} alt="any photo" /></div>
                <div className={classes.socialDiv}>
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/R.474b5da11cc41d790563ef47f49a79c7?rik=m0cZbfb4q8X27w&pid=ImgRaw&r=0" alt="facebook" />
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/OIP.AJVrHRdiMbdgkzansQ7LNwHaHk?w=188&h=192&c=7&r=0&o=5&pid=1.7" alt="twitter" />
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/R.28455daec5f7b0b8406c8b32ef342ce1?rik=%2fA0teYw7JGO7Hw&pid=ImgRaw&r=0" alt="instagram" />
                </div>
                <div className={classes.aboutList}>
                    <span><Link href="/about"><a>سياسة الخصوصية</a></Link></span>
                    <span><Link href="/about"><a>شروط الاستخدام</a></Link></span>
                    <span><Link href="/about"><a>من نحن</a></Link></span>
                    <span last="last"><Link href="/about"><a>اتصل بنا</a></Link></span>
                </div>
            </div>
            <span className={classes.copyRight}>&copy; حميع الحقوق محفوظة لصالح موقع المطرجي 2021</span>
        </footer>
    )
}

export default Footer;