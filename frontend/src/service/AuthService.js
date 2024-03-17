import axios from "axios";

const base_url = "http://localhost:8080/api/auth/v1";

export const registerUser = (user) => axios.post(base_url+"/register",user);
export const login = (user) => axios.post(base_url+"/login", user);
export const storeToken = (token) => localStorage.setItem("token",token);
export const getToken = () => localStorage.getItem("token");
export const savedLoggedInUser =(username) =>  sessionStorage.setItem("authenticatedUser",username);
export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if(username === null) return false;
    else return true;
}
export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");
export const getRole = () => localStorage.getItem("role");
export const setRole = (role) => {
    localStorage.setItem("role",role);
} 
export const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
}