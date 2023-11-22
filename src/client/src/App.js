import "./App.css";
import ListComponent from "./components/ListComponent";
import { useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import UserBar from "./UserBar";
import CreateNewItem from "./components/CreateNewItem";
import appReducer from "./Reducers";
import { StateContext } from "./contexts";

function App() {

  // useEffect(()=> {
  //   fetch("/api/listItem")
  //     .then((result) => result.json())
  //     .then((listItem) => dispatch({ type: "FETCH_TODO", listItem }));
  // }, []);

  // useEffect(() => {
  //   if (toDoListItem && toDoListItem.data){
  //     const filteredToDoList = toDoListItem.data.reverse().filter((item) => item.author == user)
  //     dispatch({ type: "FETCH_TODO", listItem: filteredToDoList })
  //   }
  // }, [toDoListItem]);
  
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    listItem: [],
  })
  
  let {listItem, user} = state;

  const [ toDoListItem, getToDoListItem ] = useResource(() => ({
    url: '/post',
    method: 'get',
    headers: { Authorization: `${state?.user?.access_token}` },
  }))

  useEffect(() => {
    getToDoListItem();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (
      toDoListItem &&
      toDoListItem.isLoading === false &&
      toDoListItem.data
    ) {
     
      dispatch({
        type: "FETCH_TODO",
        listItem: toDoListItem.data.reverse(),
      });
    }
  }, [toDoListItem]);

  useEffect(() => {
    if (user) {
      document.title = `${user.user}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  return (
    <div className="App">
      <StateContext.Provider value={{state, dispatch}}>
        <UserBar />
        {user && <CreateNewItem />}
        {state.user && (
          <ListComponent
            listItem={listItem}
            user={user}
            //dispatch={dispatch}
          />
        )}
      </StateContext.Provider>
    </div>
  );
}

export default App;
