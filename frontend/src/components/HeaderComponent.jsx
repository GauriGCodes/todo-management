import { NavLink,useNavigate } from "react-router-dom";
import {isUserLoggedIn, logOut} from "../service/AuthService.js";
import { useEffect,useState } from "react";

const Header = () => {

    const[isAuth,setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        if(isUserLoggedIn()){
            setIsAuth(true);
        }else setIsAuth(false);
    },[]) 

    function handleLogout(){
        logOut();
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="http://localhost:3000">Todo Management Application</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                  { 
                                 isAuth && 
                                 <li className="nav-item">
                                  <NavLink to="/todos" className="nav-link">Todos</NavLink> 
                                </li> 
                                }
                                 { 
                                 !isAuth && 
                                 <li className="nav-item">
                                  <NavLink to="/register" className="nav-link">Register</NavLink> 
                                </li> 
                                }
                               { 
                               !isAuth && 
                               <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink> 
                               </li> 
                               }
                               { 
                               isAuth && 
                               <li className="nav-item">
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink> 
                               </li> 
                               }
                            </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Header;