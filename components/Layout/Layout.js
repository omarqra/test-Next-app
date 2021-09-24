import classes from "./Layout.module.css";
const Layout = ({children}) => {
    return (
    <>
        <nav className={classes.nav}>
            <div className={classes.container}>
                <div  className={classes.navContent}>
                    <h1 className={classes.navContentHeader}>خبر ومقال</h1>
                        
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
    </>
    )
        
}

export default Layout;