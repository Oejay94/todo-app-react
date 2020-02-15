import todosList from "./todos.json";
import {
  CLEAR_COMPLETED_TODOS,
  TOGGLE_TODO,
  ADD_TODO,
  DELETE_TODO
} from "./actions";

const initialState = {
  todos: todosList
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case DELETE_TODO:
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload)
        };

    case CLEAR_COMPLETED_TODOS:
        return {
            ...state,
            todos: state.todos.filter(todo => todo.completed === false)
        };
    default:
        return state;
  }
}

export default reducer;
