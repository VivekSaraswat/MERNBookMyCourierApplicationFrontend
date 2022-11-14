import { NavLink } from "react-router-dom";
import image1 from "../../../images/JumboBgImg.jpeg"
import { useNavigate } from "react-router-dom";


const NavBarUser = () => {
    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        async function logout() {
            if (localStorage.removeItem('token') == null && localStorage.removeItem('userId') == null) {
                navigate(`/home`)
            }
        }
        logout();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" hrefLang="#" to={"/home"}>
                        CS
                    </NavLink>
                    <button className="navbar-toggler "
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobileMenu"
                        aria-controls="mobileMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon top-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mobileMenu">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/home">
                                    Home
                                </NavLink>
                            </li>
                        </div>
                    </div>
                </div>

                <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                    <div className="btn-group">
                        <input type="submit" value="LogOut" className="btn btn-danger my-2 my-sm-0" />
                    </div>
                </form>
            </nav>
            <div className="jumbotron" style={newstyle}>
                <h1 className="display-3">Courier Service</h1>
                <p className="lead">An easy doorstep service for you..</p>
            </div>
        </>
    )
}

export default NavBarUser;