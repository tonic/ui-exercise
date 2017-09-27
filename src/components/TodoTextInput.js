import React, { Component } from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
  state = {
    text: this.props.text || ''
  }

  handleSubmit = (event) => {
    const text = event.target.value.trim();

    if (event.which === 13) {
      this.props.onSave(text)

      if (this.props.newTodo) {
        this.setState({
          text: ''
        })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  handleBlur = (event) => {
    if (!this.props.newTodo) {
      this.props.onSave(event.target.value);
    }
  }

  render() {
    const cls = classnames({
      'todo-input': true,
      'is-editing': this.props.editing,
      'is-new': this.props.newTodo
    });

    return (
      <input
        className={cls}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}

export default TodoTextInput;
