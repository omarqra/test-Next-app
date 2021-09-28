import classes from "./Box.module.css"
const Box = ({title, text}) => {
    return (
        <div className={classes.box}>
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