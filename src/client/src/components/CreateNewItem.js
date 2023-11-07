import React from "react";
import { useState, useContext } from "react";
import { StateContext } from "../contexts";
import { v4 as uuidv4 } from 'uuid';
import { useResource } from "react-request-hook";
import moment from 'moment';

const CreateNewItem = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const [listItem, createListItem] = useResource(({title, description, author, dateSet, id}) => {
    const complete = false;
    
    return ({ 
    url: "/listItem",
    method: "post",
    data: {title, description, author, complete, dateSet, id},
  })
}
  );

  const handleChange = (event) => {
    if (event.target.name == "postTitle") {
      setTitle(event.target.value);
    } else if (event.target.name == "postDescription") {
      setDescription(event.target.value);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const newItem = {
        title: title,
        description: description,
        author: user,
        dateSet: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        id: uuidv4()
    }
    createListItem(newItem);
    dispatch( {type: "CREATE_TODO", payload: {listItem:newItem,author:user} })
    resetItem()
  };

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
