import { useContext } from "react";
import { StateContext } from "./contexts";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { useState } from "react";
import styled from "styled-components";

export default function UserBar() {

  const {state} = useContext(StateContext);
  const {user} = state;

  const [register, setRegister] = useState(true);

  if (user) {
    return <Logout />;
    
  } else {
    return (
      <Wrapper>
       {!register && <Login />}
       {register && <Register />}
        <button onClick={()=>setRegister(!register)}>
         {register?"Already registered? Click to login":"Don't have an account? Click to register"}
        </button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  button{
    border:none;
  }
`;
