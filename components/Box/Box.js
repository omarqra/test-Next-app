import { useRef, useEffect } from "react";
import classes from "./Box.module.css"
const Box = ({title, text, isOpen}) => {
    let state = false;
    const fixClick = (e) => {
        state = !state;
        if (state) {
            e.target.nextSibling.style.height = `${e.target.nextSibling.firstChild.clientHeight}px`;
        }
        else {
            e.target.nextSibling.style.height = "0";
        }
    }
    // console.log(pg.current.parentNode.style.height);
    const pg = useRef(null);
    useEffect(() => {
        if (isOpen) {
            state = true;
            pg.current.parentNode.style.height = `${pg.current.clientHeight}px`;
        }
    }, [])
    return (
        <div className={classes.box}>
            <h3 className={classes.boxTitle} onClick={fixClick}>
                    {title}
            </h3>
            <div className={classes.boxTextShow}>
                <p ref={pg}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Box;