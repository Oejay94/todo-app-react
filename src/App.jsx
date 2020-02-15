import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import TodoList from "./TodoList";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCompletedTodos, addTodo } from "./actions";

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
      this.props.addTodo(this.state.value);
      this.setState({ value: "" });
    }
  };

  render() {
    let counter = 0;
    for (let i = 0; i < this.props.todos.length; i++) {
      if (this.props.todos[i].completed === false) {
        counter++;
      }
    }
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todo List</h1>
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
            handleDeleteCompletedTodos={() => this.props.clearCompletedTodos}
            todos={this.props.todos}
            />
          )}
        />
        <Route
          exact
          path="/active"
          render={() => (
            <TodoList
            handleDeleteCompletedTodos={() => this.props.clearCompletedTodos}
            todos={this.props.todos.filter(todo => todo.completed !== true)}
            />
          )}
        />
        <Route
          exact
          path="/completed"
          render={() => (
            <TodoList
            handleDeleteCompletedTodos={() => this.props.clearCompletedTodos}
            todos={this.props.todos.filter(todo => todo.completed === true)}
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
            onClick={this.props.clearCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = {
  clearCompletedTodos,
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
