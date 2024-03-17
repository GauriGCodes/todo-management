import {isUserLoggedIn} from "../service/AuthService.js";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({children}) => {

    const auth = isUserLoggedIn();
    if(auth){
        return children;
    }

    else return <Navigate to="/" />
}

export default AuthenticatedRoute;