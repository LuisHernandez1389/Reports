import { Link } from "react-router-dom";
import "./navbar.css"
import Logo from "../../img/report_9771805.png"

const navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">

                    <img src={Logo} width="40"/>
                </div>
                <div className="navbar-links">
                    <Link to='/' className="nav-link">Inicio</Link>
                    <Link to='/reports' className="nav-link">Reportes</Link>
                    <Link to='/lists' className="nav-link">Listas</Link>

                </div>
            </div>
        </nav>
    )
}                   
export default navbar;