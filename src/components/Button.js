import { Link } from "react-router-dom";
const Button = ({link, text, btnModifier}) => {
    return (
        <div className={`btn ${btnModifier}`}>
            <Link to={link}>
                {text}
            </Link>
        </div>
   )
}

export default Button;