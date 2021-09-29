import classes from "./Box.module.css"
const Box = ({title, text}) => {
    let state = false;
    const clicked = () => state = !state;
    return (
        <div className={state? classes.boxclicked: classes.boxunclick} onClick={clicked}>
            <h3 className={classes.boxTitle}>
                    {title}
            </h3>
            <p className={classes.boxText}>
                {text}
            </p>
        </div>
    )
}

export default Box;