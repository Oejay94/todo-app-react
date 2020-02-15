export const ADD_TODO = "ADD_TODO";
export const CLEAR_COMPLETED_TODOS = "CLEAR_COMPLETED_TODOS";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    payload: id
  };
};

export const addTodo = todoTitle => {
  return {
    type: ADD_TODO,
    payload: {
      userId: 1,
      id: Math.floor(Math.random() * 1000000),
      title: todoTitle,
      completed: false
    }
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    payload: id
  };
};

export const clearCompletedTodos = () => {
    return {
        type: CLEAR_COMPLETED_TODOS
    };
};
