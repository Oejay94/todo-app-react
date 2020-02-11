import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              handleDeleteCompletedTodos={this.props.handleDeleteCompletedTodos}
              handleDeleteTodo={this.props.handleDeleteTodo(todo.id)}
              title={todo.title}
              completed={todo.completed}
              handleToggleTodo={this.props.handleToggleTodo(todo)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList

