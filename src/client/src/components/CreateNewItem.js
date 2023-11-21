import React from "react";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "../contexts";
import { v4 as uuidv4 } from 'uuid';
import { useResource } from "react-request-hook";
import moment from 'moment';

const CreateNewItem = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {state, dispatch} = useContext(StateContext);

  const {user} = state;

  let complete = false;

  const [listItem, createListItem] = useResource(({title, description, author, dateSet, complete}) => {
    return ({ 
    url: "/post",
    method: "post",
    data: {title, description, author, complete, dateSet},
    headers: { Authorization: `${state?.user?.access_token}` },
  })
}
  );
  

  const handleChange = (event) => {
    if (event.target.name === "postTitle") {
      setTitle(event.target.value);
    } else if (event.target.name === "postDescription") {
      setDescription(event.target.value);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let newItem = {
        title: title,
        description: description,
        author: user.username,
        dateSet: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        complete:complete,
        id: uuidv4(),
    }
    createListItem(newItem);
    resetItem()
  };
  
  useEffect(() => {
    if (listItem.isLoading === false && listItem.data){
      dispatch({type: "CREATE_TODO", payload: {
        title: listItem.data.title,
        description: listItem.data.description,
        id: listItem.data.id,
        author: user.username,}});
    }
  }, [listItem]);

  const resetItem = () => {
    setDescription("")
    setTitle("")
}

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="postTitle">Title:</label>
      <input type="text" value={title} name="postTitle" onChange={handleChange} />

      <label htmlFor="postDescription">Description:</label>
      <input type="text" value={description} name="postDescription" onChange={handleChange} />

      <input type="submit" value="Add" disabled={!title?true:false} />
    </form>
  );
};

export default CreateNewItem;
