import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo) => todo.completed
}

class Main extends Component {
  state = {
    filter: SHOW_ALL
  }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  }

  handleShow = (filter) => {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;

    if (todos.length > 0) {
      return (
        <label>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
            onChange={actions.completeAll}
          /> Complete All
      </label>
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;
    const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);
    const filteredTodos = todos.filter(TODO_FILTERS[filter]).map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          {...actions}
        />
      );
    });

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}

        <ul className="todo-list">
          {filteredTodos}
        </ul>

        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

export default Main;
