import React, { FC } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { connect } from 'react-redux';
import { TodoList } from './components/TodoList/TodoList';
import {
  getLoading,
  getTodos,
  setLoading,
  setTodos,
} from './store';
import { getTodosWithUser } from './utils/api';
import { State, TodoWithUser } from './constants/types';


interface Props {
  todos: TodoWithUser[];
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  setTodos: (value: TodoWithUser[]) => void;
}

const App: FC<Props> = (props) => {
  const handleStart = async () => {
    props.setLoading(true);

    const visibleTodos = await getTodosWithUser();

    props.setTodos(visibleTodos);
    props.setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="title">Dynamic list of TODOs</h1>
      {!props.todos.length
        ? (
          <button
            className="button"
            type="button"
            onClick={handleStart}
          >
            {props.isLoading ? 'Loading.......' : 'Start load'}
          </button>
        ) : (
          <TodoList />
        )}
    </div>
  );
};

const mapDispatchToProps = { setLoading, setTodos };

const mapStateToProps = (state: State) => ({
  todos: getTodos(state),
  isLoading: getLoading(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
