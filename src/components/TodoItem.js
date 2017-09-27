import React, { Component } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({
      editing: true
    });
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }

    this.setState({
      editing: false
    });
  }

  renderEditView() {
    const { todo, completeTodo, deleteTodo } = this.props;

    return (
      <TodoTextInput
        text={todo.text}
        editing={this.state.editing}
        onSave={(text) => this.handleSave(todo.id, text)}
      />
    );
  }

  renderShowView() {
    const { todo, completeTodo, deleteTodo } = this.props;

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />

        <label
          className="todo-item-label"
          onDoubleClick={this.handleDoubleClick}>
          {todo.text}
        </label>

        <button
          className="destroy"
          onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    );
  }

  render() {
    const view = this.state.editing ? this.renderEditView() : this.renderShowView();
    const cls = classnames({
      'todo-item': true,
      'is-completed': this.props.todo.completed,
      'is-editing': this.state.editing
    });

    return (
      <li className={cls}>
        {view}
      </li>
    );
  }
}

export default TodoItem;
