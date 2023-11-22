import React, { useEffect } from "react";
import { StateContext } from "../contexts";
import { useContext } from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import { useResource } from "react-request-hook";

const ListComponent = () => {
  const { state, dispatch } = useContext(StateContext);
  console.log("inside listComponent")
  console.log(state)
let {listItem}= state
console.log(listItem)
  let author = state.user.user;

  const [todoList, changeToggle] = useResource((_id) => {
    let changedItem = state.listItem.filter((item) => (item._id === _id||item.id==_id))[0];
    console.log(changedItem);
     let { complete, dateComplete } = changedItem;
    return {
      url: `/post/${_id}`,
      method: "patch",
      data: { complete, dateComplete },
      headers: { Authorization: `${state?.user?.access_token}` },
    };
  });

  const checkBox = (idToUse) => {
    console.log("inside checkbox");
    console.log(idToUse)
    dispatch({ type: "CHECK_COMPLETE", payload: idToUse });
    setTimeout(()=>{changeToggle(idToUse)},[1000])
  };

  const [deleteToDo, deleteToDoItem] = useResource((_id) => {
    return {
      url: `/post/${_id}`,
      method: "delete",
      data: { _id },
      headers: { Authorization: `${state?.user?.access_token}` },
    };
  });

  const deleteItem = (_id) => {
    dispatch({ type: "DELETE_TODO", payload: _id })
    setTimeout(()=>{deleteToDoItem(_id)},[1000])
  };

  return (
    <Wrapper>
      {listItem.map((element, index) => {
        const {
         id,
          _id,
          title,
          description,
          dateSet,
          complete,
          dateComplete,
        } = element;
        const key = index;
let idToUse = _id?_id:id
console.log(index)
console.log(_id,title,id);

        return (
          <ListItem
            id={idToUse}
            key={key}
            title={title}
            description={description}
            author={author}
            dateCreated={dateSet}
            complete={complete}
            dateComplete={dateComplete}
            handleCompletedBox={() => checkBox(idToUse)}
            handleDelete={() => deleteItem(idToUse)}
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
