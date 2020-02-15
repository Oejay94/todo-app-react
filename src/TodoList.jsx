import React, { Component } from "react";
import TodoItem from "./TodoItem";
import { deleteTodo, toggleTodo } from "./actions";
import { connect } from "react-redux";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              handleDeleteTodo={() => this.props.deleteTodo(todo.id)}
              title={todo.title}
              completed={todo.completed}
              handleToggleTodo={() => this.props.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

const mapDispatchToProps = {
  deleteTodo,
  toggleTodo
}
export default connect(null, mapDispatchToProps)(TodoList)
