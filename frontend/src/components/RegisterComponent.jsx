import { useState } from "react";
import {registerUser} from "../service/AuthService.js";

const RegisterComponent = () => {

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function onSubmit(e) {
        e.preventDefault();
        const user = {name, username, email, password};
        console.log(user);
        registerUser(user).then(
            (response) => {
                console.log("User has been registered successfully!!");
            }
        ).catch((err)=>{
            console.error(err);
        })
    }

    
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3  bg-transparent border-dark">
                        <div className="card-header">
                            <h2 className="text-center">Registration Form</h2>
                        </div>
                        <div className="card-body">
                            <form>
                               <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                               </div>
                               <div className="form-group mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={username} placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} />
                               </div>
                               <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
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

export default RegisterComponent;