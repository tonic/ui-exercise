import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import * as TodoActions from '../actions';

const App = ({todos, actions}) => (
  <div className="app">
    <Header addTodo={actions.addTodo} />
    <Main todos={todos} actions={actions} />
  </div>
);

const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
