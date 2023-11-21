import React, { useEffect } from "react";
import { StateContext } from "../contexts";
import { useContext } from "react";
import ListItem from "./ListItem";
import styled from "styled-components";
import { useResource } from "react-request-hook";

const ListComponent = ({ listItem }) => {
  const { state, dispatch } = useContext(StateContext);

  let author = state.user.user;

  const [todoList, changeToggle] = useResource((_id) => {
    let changedItem = state.listItem.filter((item) => item._id === _id)[0];
    let { complete, dateComplete } = changedItem;
    return {
      url: `/post/${_id}`,
      method: "patch",
      data: { complete, dateComplete },
      headers: { Authorization: `${state?.user?.access_token}` },
    };
  });

  const checkBox = (_id) => {
    dispatch({ type: "CHECK_COMPLETE", payload: _id });
    setTimeout(()=>{changeToggle(_id)},[1000])
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
          _id,
          title,
          description,
          dateSet,
          complete,
          dateComplete,
        } = element;
        const key = index;

        return (
          <ListItem
            id={_id}
            key={key}
            title={title}
            description={description}
            author={author}
            dateCreated={dateSet}
            complete={complete}
            dateComplete={dateComplete}
            handleCompletedBox={() => checkBox(_id)}
            handleDelete={() => deleteItem(_id)}
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
