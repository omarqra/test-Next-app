import classes from "./Box.module.css"
const Box = ({title, text}) => {
    let state = false;
    const fixClick = (e) => {
        state = !state;
        if (state) e.target.nextSibling.className = classes.boxTextShow;
        else e.target.nextSibling.className = classes.boxTextUnShow;
    }
    return (
        <div className={classes.box} onClick={fixClick}>
            <h3 className={classes.boxTitle}>
                    {title}
            </h3>
            <p className={classes.boxTextUnShow}>
                {text}
            </p>
        </div>
    )
}

export default Box;