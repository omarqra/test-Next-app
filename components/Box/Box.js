import classes from "./Box.module.css"
const Box = ({title, text}) => {
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
    return (
        <div className={classes.box} onClick={fixClick}>
            <h3 className={classes.boxTitle}>
                    {title}
            </h3>
            <div className={classes.boxTextShow}>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Box;