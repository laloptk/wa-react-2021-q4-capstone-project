const Button = (props) => {
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = e.target.href !== undefined 
            ? e.target.href 
            : window.location.protocol + "//" + window.location.host + "/";
    }

    return (
        <div className={`btn ${props.btnModifier}`}>
            <a href={props.link} onClick={event => handleClick(event)}>
                {props.text}
            </a>
        </div>
   )
}

export default Button;