import { Link } from "react-router-dom";
import "./navbar.css"

const navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">

                    <span>ReportesApp</span>
                </div>
                <div className="navbar-links">
                    <Link to='/' className="nav-link">Inicio</Link>
                    <Link to='/reports' className="nav-link">Reportes</Link>

                </div>
            </div>
        </nav>
    )
}                   
export default navbar;