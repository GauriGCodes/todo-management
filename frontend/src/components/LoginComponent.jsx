import { useState } from "react";
import {login,storeToken,savedLoggedInUser, setRole} from "../service/AuthService.js";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

   async function onSubmit(e){
        e.preventDefault();
        const user = {usernameOrEmail, password};
       await login(user).then((response) => {
         //   const token = 'Basic '+window.btoa(usernameOrEmail+":"+password);  
            const token = 'Bearer ' + response.data.accessToken;
            storeToken(token);
            savedLoggedInUser(usernameOrEmail);
            setRole(response.data.role);
            navigate("/todos");
            window.location.reload(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
           <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 bg-transparent border-dark">
                        <div className="card-header">
                            <h2 className="text-center">Login Form</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="usernameOrEmail" className="form-label">Email</label>
                                    <input type="usernameOrEmail" className="form-control" id="usernameOrEmail" name="usernameOrEmail" value={usernameOrEmail} placeholder="Enter email address" onChange={(e) => setUsernameOrEmail(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-success" onClick={onSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default LoginComponent;