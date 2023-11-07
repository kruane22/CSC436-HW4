import { useState, useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Register() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const {dispatch} = useContext(StateContext);

    const [userName, register] = useResource((user, password) =>{
        console.log("running useResource")
        return ({
        url: "/users",
        method: "post",
        data: { email: user, password },
        })});

    useEffect(() => {
        if (userName && userName.data) {
            console.log(userName.data.user.email);
            dispatch({ type: "REGISTER", user: userName.data.user.email })
        }
    }, [userName, dispatch]);

    const handleChange = (event) => {
        if (event.target.name == "registerName") {
            setUser(event.target.value);
        } else if (event.target.name == "registerPassword") {
            setPassword(event.target.value);
        } else if (event.target.name == "registerRepeat"){
            setRepeatPassword(event.target.value);
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            user:user,
            password:password
        }
        console.log("in form submit in Register")
        console.log(newUser);
        console.log(user);
        console.log(password);
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
        
        <input type="submit" value="Register" disabled={user&&(password==repeatPassword)&&password?false:true} />
    </form>
    )
}