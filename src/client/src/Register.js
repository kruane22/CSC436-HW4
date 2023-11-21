import { useState, useEffect } from "react";
// import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Register() {
    const [status, setStatus] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [username, register] = useResource((username, password) => ({
        url: "/auth/register",
        method: "post",
        data: { username, password, passwordConfirmation: password },
      }));

    // const {dispatch} = useContext(StateContext);
    // const [userName, register] = useResource((user, password) =>{
    //     return ({
    //     url: "/auth/register",
    //     method: "post",
    //     data: { userName: user, password, passwordConfirmation: repeatPassword },
    //     })});

    // useEffect(() => {
    //     if (userName && userName.data) {
    //         console.log(userName.data.user.email);
    //         dispatch({ type: "REGISTER", user: userName.data.user.email })
    //     }
    // }, [userName, dispatch]);

    useEffect(() => {
        if (username && username.isLoading === false && (username.data || username.error)) {
          if (username.error) {
            setStatus("Registration failed, please try again later.");
          } else {
            setStatus("Registration successful. You may now login.");
          }
        }
      }, [username]);



    const handleChange = (event) => {
        if (event.target.name === "registerName") {
            setUser(event.target.value);
        } else if (event.target.name === "registerPassword") {
            setPassword(event.target.value);
        } else if (event.target.name === "registerRepeat"){
            setRepeatPassword(event.target.value);
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            user:user,
            password:password
        }
        register(user, password);
        //dispatch( {type: "REGISTER", payload: {author:user}} );
    }

    return (
    <form onSubmit={formSubmit}>
        <label htmlFor="register-username">Username:</label>
        <input type="text" value={user} name="registerName" 
        onChange={handleChange}/>

        <label htmlFor="register-password">Password:</label>
        <input type="password" value={password} name="registerPassword" onChange={handleChange} />

        <label htmlFor="register-password-repeat">Repeat password:</label>
        <input type="password" value={repeatPassword}name="registerRepeat" 
        onChange={handleChange} />
        
        <input type="submit" value="Register" disabled={user&&(password===repeatPassword)&&password?false:true} />
    {status && <p>{status}</p>}
    </form>
    )
}