import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Logout() {

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    const formSubmit = (e) => {
        e.preventDefault();
        dispatch ( {type: "LOGOUT"} );
        dispatch ( {type: "CLEAR_LIST"} );
    }

    return (
    <form onSubmit={formSubmit}>
        Logged in as: <b>{user}</b>
        <input type="submit" value="Logout" />
    </form>
    )
    }