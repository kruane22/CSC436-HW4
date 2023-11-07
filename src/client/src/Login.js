import { useState, useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import {useResource} from "react-request-hook"

export default function Login() {

  const [user, setUser] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(StateContext);

  const [userName, login] = useResource((user, password) => ({
    url: "/login",
    method: "post",
    data: { email: user, password },
    })); 

  useEffect(() => {
    if (userName) {
      if (userName?.data?.user) {
        setLoginFailed(false);
        dispatch({ type: "LOGIN", user: userName.data.user.email });
      } else {
        if (userName.error?.code == "ERR_BAD_REQUEST"){
          setLoginFailed(true);
        }
      }
    }
  }, [userName, dispatch]);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  function handlePassword (evt) { setPassword(evt.target.value) }

  const formSubmit = (e) => {
    e.preventDefault();
    // dispatch( {type: "LOGIN", payload: {user}} );
    login(user, password);
  };

  return (
    <>
    {loginFailed && (<span style={{ color: "red"}}>Invalid username or password</span>)}

    <form onSubmit={formSubmit}>
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        value={user}
        name="login-username"
        id="login-username"
        onChange={handleChange}
      />
      <label htmlFor="login-password">Password:</label>
      <input 
        type="password" 
        value={password} 
        onChange={handlePassword}  
        name="login-password" 
        id="login-password" />
      <input type="submit" value="Login" disabled={user?false:true}/>   
    </form>
    </>
  );
}

