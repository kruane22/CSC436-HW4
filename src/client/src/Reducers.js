import moment from 'moment';

function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.user
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  
  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newToDo = {
          title: action.payload.listItem.title,
          description: action.payload.listItem.description,
          author: action.payload.author,
          dateSet: action.payload.listItem.dateSet,
          id: action.payload.listItem.id,
          complete: false,
        };
        return [newToDo, ...state];
        
      case "FETCH_TODO":
        return action.listItem;

      case "CLEAR_LIST":
        return [];

      case "CHECK_COMPLETE":
        const completeID=action.payload
        const temporaryList = state.map((e) => {
          if (e.id == completeID) {
            let dateComplete = e.complete==false ? `Completed on: ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}` : "";
            return {
                    ...e,
                    complete: !e.complete,
                    dateComplete: dateComplete
                    };
          } else return e;
        });
        return temporaryList;
          
      case "DELETE_TODO":
        const deleteID=action.payload
        const filteredArray = state.filter((e) => {return e.id != deleteID})
        return filteredArray;
      default:
        return state;
    }
  }
  
  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      listItem: todoReducer(state.listItem, action),
    };
  }