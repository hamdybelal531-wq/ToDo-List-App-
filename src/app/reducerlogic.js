import { v4 as uuidv4 } from "uuid";

export default function Reducerlogic(CurrentState, action) {
  switch (action.type) {
    case "Add": {
      if (action.pryload !== "") {
        const newTods = [
          ...CurrentState,
          { id: uuidv4(), titleSection: action.pryload, isCompleted: false },
        ];
        localStorage.setItem("todos", JSON.stringify(newTods));
        return newTods;
      }
    }
    case "Delete": {
      const todosDelet = CurrentState.filter((t) => {
        return t.id !== action.pryload;
      });
      localStorage.setItem("todos", JSON.stringify(todosDelet));
      return todosDelet;
    }
    case "Edite": {
      const NewEditeState = CurrentState.map((t) => {
        if (
          t.id === action.pryload.idTask &&
          action.pryload.inputState !== ""
        ) {
          return { ...t, titleSection: action.pryload.inputState };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(NewEditeState));
      return NewEditeState;
    }
    case "Save": {
      const NewSaveTodo = CurrentState.map((t) => {
        if (t.id === action.pryload) {
          return { ...t, isCompleted: !t.isCompleted };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(NewSaveTodo));
      return NewSaveTodo;
    }
    case "reload": {
      return action.pryload;
    }
  }
}
