import { Link, useNavigate } from "react-router-dom"
// import { Login } from "../auth/Login"
import "./NavBar.css"
import { Collapse } from "bootstrap"

export const NavBar = () => {
    const navigate = useNavigate()

    const pageHeader = () => {
        let displayName = ""
        let thisPage = window.location.pathname.split("/")
        if (thisPage.length === 2) {
            if (thisPage[1] === "" || thisPage[1] === "home") {
                displayName = "Nash Murals Home"
            } else if (thisPage[1] === "hood") {
                displayName = "Neighborhoods"
            } else if (thisPage[1] === "murals") {
                displayName = "Murals"
            }
        }
        else { displayName = "I'm pretty sure we're lost." }
        return displayName
    }

    return (
        <div className="pos-f-t">
            <nav className="navbar navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>

                    <div className="collapse" id="navbarToggleExternalContent">

                        <div className="bg-dark p-1">
                            <div className="navbar-item">
                                <span className="navbar__link"
                                    onClick={() => navigate("/")}>Home</span>
                            </div>
                            <div className="navbar-item">
                                <span className="navbar__link" onClick={() => navigate("/hood")}>Neighborhoods</span>
                            </div>
                            <div className="navbar-item">
                                <span className="navbar__link"
                                    onClick={() => navigate("/murals")}>Murals</span>
                            </div>

                        </div>
                    </div>
                </button>
                <div>{pageHeader()}</div>
            </nav>
        </div>
        // <ul className="navbar">
        //     <li className="navbar__item active">
        //         <h1 className="navbar__link" 
        //         onClick={() => navigate("/hood")}>Neighborhoods</h1>
        //     </li>
        //     <li className="navbar__item active">
        //         <h1 className="navbar__link" 
        //         onClick={() => navigate("/murals")}>Murals</h1>
        //     </li>            
        //     <li className="navbar__item active">
        //         <h1 className="navbar__link"
        //         onClick={() => navigate("/")}>Home</h1>
        //     </li>     
        //     {/* {
        //         localStorage.getItem("nash_token")
        //             ? <li className="navbar__item navbar__logout">
        //                 <Link className="navbar__link" to="" onClick={() => {
        //                     localStorage.removeItem("nash_token")
        //                     navigate("/", {replace: true})
        //                 }}>Logout</Link>
        //             </li>
        //             : ""
        //     } */}
        // </ul>

    )
}



