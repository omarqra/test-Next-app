import Footer from "./Footer/Footer";
import classes from "./Layout.module.css";
import Link from "next/link";
const Layout = ({children}) => {
    return (
    <>
        <nav className={classes.nav}>
            <div className={classes.container}>
                <div  className={classes.navContent}>
                    <Link href="/"><a><h1 className={classes.navContentHeader}>خبر ومقال</h1></a></Link>
                        
                    {/* DropDown */}
                    <div className={classes.dropdown}>
                        <span> التصنيفات </span>
                        <ul className={classes.dropdownList}>
                            <li>صنف 1</li>
                            <li>صنف 2</li>
                            <li>صنف 3</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </nav>
        {children}
        <Footer />
    </>
    )
        
}

export default Layout;