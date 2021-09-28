import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerLists}>
                <div className={classes.imgDiv}><img  className={classes.image} src="https://th.bing.com/th/id/OIP._U_25wQ97HqBu4hHFg53jgHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7" alt="any photo" /></div>
                <div className={classes.socialDiv}>
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/R.474b5da11cc41d790563ef47f49a79c7?rik=m0cZbfb4q8X27w&pid=ImgRaw&r=0" alt="facebook" />
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/OIP.AJVrHRdiMbdgkzansQ7LNwHaHk?w=188&h=192&c=7&r=0&o=5&pid=1.7" alt="twitter" />
                    <img className={classes.socialImg} src="https://th.bing.com/th/id/R.28455daec5f7b0b8406c8b32ef342ce1?rik=%2fA0teYw7JGO7Hw&pid=ImgRaw&r=0" alt="instagram" />
                </div>
                <div className={classes.aboutList}>
                    <span>سياسة الخصوصية</span>
                    <span>شروط الاستخدام</span>
                    <span>من نحن</span>
                    <span last="last">اتصل بنا</span>
                </div>
            </div>
            <span className={classes.copyRight}>&copy; حميع الحقوق محفوظة لصالح موقع المطرجي 2021</span>
        </footer>
    )
}

export default Footer;