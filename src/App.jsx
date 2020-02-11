import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import TodoList from "./TodoList";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  state = {
    todos: todosList,
    value: ""
  };

  handleInput = event => {
    this.setState({ value: event.target.value });
  };

  handleCreateTodo = event => {
    if (event.key === "Enter") {
      const newTodo = this.state.todos.slice();
      newTodo.push({
        userId: 1,
        id: Math.floor(Math.random() * 1000000),
        title: this.state.value,
        completed: false
      });
      this.setState({
        todos: newTodo,
        value: ""
      });
    }
  };

  handleDeleteTodo = todoIdToDelete => event => {
    // immutability
    // create copy
    const newTodo = this.state.todos.slice();
    // modify copy
    // find the index number of todoIdToDelete
    const todoIndexToDelete = newTodo.findIndex(todo => {
      if (todo.id === todoIdToDelete) {
        return true;
      } else {
        return false;
      }
    });
    newTodo.splice(todoIndexToDelete, 1);
    // overwrite original copy with new copy
    this.setState({ todos: newTodo });
  };

  handleDeleteCompletedTodos = event => {
    const newTodos = this.state.todos.filter(todo => todo.completed === false);

    this.setState({ todos: newTodos });
  };

  handleToggleTodo = todo => event => {
    const newTodo = this.state;
    todo.completed = !todo.completed;
    this.setState({ newTodo });
  };

  render() {
    let counter = 0;
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].completed === false) {
        counter++;
      }
    }
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
            onChange={this.handleInput}
            onKeyDown={this.handleCreateTodo}
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteCompletedTodos={this.handleDeleteCompletedTodos}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos}
            />
          )}
        />
        <Route
          exact
          path="/active"
          render={() => (
            <TodoList
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteCompletedTodos={this.handleDeleteCompletedTodos}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos.filter(todo => todo.completed !== true)}
            />
          )}
        />
        <Route
          exact
          path="/completed"
          render={() => (
            <TodoList
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteCompletedTodos={this.handleDeleteCompletedTodos}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos.filter(todo => todo.completed === true)}
            />
          )}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>{counter}</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink to="/" activeClassName="selected" exact>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleDeleteCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
