import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };

  //find todo to modify and delete
  handleToggleComplete = (event, todoIdToToggle) => {
    const newTodos = this.state.todos.slice();
    const newnewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: newnewTodos });
  };

  // create a new todo and update my component state
  // so that it has the new todo item
  handleAddTodo = event => {
    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 10000),
        title: event.target.value,
        completed: false
      };
      const newTodos = this.state.todos.slice();
      newTodos.push(newTodo);
      this.setState({ todos: newTodos });
      event.target.value = "";
    }
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autofocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleToggleComplete={this.handleToggleComplete}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={event =>
              this.props.handleToggleComplete(event, this.props.id)
            }
          />
          <label>{this.props.title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              handleToggleComplete={this.props.handleToggleComplete}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
