const Button = (props) => {
    return (
        <div className={`btn ${props.btnModifier}`}>
            <a href={props.link}>
                {props.text}
            </a>
        </div>
    )
}

export default Button;