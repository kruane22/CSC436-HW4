import React, { useEffect } from "react";
import { StateContext } from "../contexts";
import { useContext } from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import { useResource } from "react-request-hook";

const ListComponent = ({ listItem }) => {
  const { state, dispatch } = useContext(StateContext);

 

  const [todoList, changeToggle] = useResource((id) => {
    console.log("inside changeToggle");
    console.log(state);
    let changedItem = state.listItem.filter((item) => item.id == id)[0];
    let { title, description, author, complete, dateSet, dateComplete } =
      changedItem;
    //
    return {
      url: `/listItem/${id}`,
      method: "patch",
      data: { title, description, author, complete, dateSet, id, dateComplete },
    };
  });

  const checkBox = (id) => {
    dispatch({ type: "CHECK_COMPLETE", payload: id });
    setTimeout(()=>{changeToggle(id)},[1000])
  };

  const [deleteToDo, deleteToDoItem] = useResource((id) => {
    console.log("inside deleteToDoItem");
    console.log(state);
    
    return {
      url: `/listItem/${id}`,
      method: "delete",
    };
  });

  const deleteItem = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id })
    setTimeout(()=>{deleteToDoItem(id)},[1000])
  };

  return (
    <Wrapper>
      {listItem.map((element, index) => {
        const {
          id,
          title,
          description,
          author,
          dateSet,
          complete,
          dateComplete,
        } = element;

        const key = index;

        return (
          <ListItem
            id={id}
            key={key}
            title={title}
            description={description}
            author={author}
            dateCreated={dateSet}
            complete={complete}
            dateComplete={dateComplete}
            handleCompletedBox={() => checkBox(id)}
            handleDelete={() => deleteItem(id)}
          />
        );
      })}
    </Wrapper>
  );
};

export default ListComponent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
