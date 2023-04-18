import { Link, useNavigate } from "react-router-dom"
// import { Login } from "../auth/Login"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <h1 className="navbar__link" 
                onClick={() => navigate("/hood")}>Neighborhoods</h1>
            </li>
            <li className="navbar__item active">
                <h1 className="navbar__link" 
                onClick={() => navigate("/murals")}>Murals</h1>
            </li>            
            <li className="navbar__item active">
                <h1 className="navbar__link"
                onClick={() => navigate("/")}>Home</h1>
            </li>     
            {/* {
                localStorage.getItem("nash_token")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("nash_token")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            } */}
        </ul>
    )
}

