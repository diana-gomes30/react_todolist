import { useReducer, useEffect } from 'react';
import UpdateArea from './UpdateArea';
import CreateArea from './CreateArea';
import ItemList from './ItemList';
import { reducer } from '../reducer';

const initialState = {
  taskList: localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks'))
    : [],
  updatingTask: {},
  isEditingTask: false,
};

function App() {
  // Tasks (ToDo List) State
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.taskList));
  }, [state.taskList]);

  // Add Task
  const addTask = (newTask) => {
    dispatch({ type: 'ADD', task: newTask });
  };

  // Delete Task
  const deleteTask = (id) => {
    dispatch({ type: 'DELETE', id: id });
  };

  // Mark task done or completed
  const checkTask = (id) => {
    dispatch({ type: 'CHECK', id: id });
  };

  // Update Task
  const updateTask = (task) => {
    dispatch({ type: 'UPDATE', task: task });
    cancelUpdate();
  };

  // Change task for update
  function changeTask(task) {
    dispatch({ type: 'UPDATING-TASK', task: task });
    dispatch({ type: 'CHANGE-TO-UPDATE' });
  }

  // Cancel Update
  function cancelUpdate() {
    dispatch({ type: 'CANCEL-UPDATE' });
    dispatch({
      type: 'UPDATING-TASK',
      task: {
        id: 0,
        content: '',
        status: false,
      },
    });
  }

  return (
    <div className="container app">
      <br />
      <br />
      <h1>To Do List App</h1>
      <br />
      <br />

      {
        /* Update Task / Add Task */
        state.isEditingTask ? (
          <UpdateArea
            onUpdate={updateTask}
            onCancel={cancelUpdate}
            updatingTask={state.updatingTask}
          />
        ) : (
          <CreateArea onAdd={addTask} />
        )
      }

      <br />

      {/* Display Task List */}
      {state.taskList.length === 0 && <p>No Tasks...</p>}
      {state.taskList
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map((task, index) => (
          <ItemList
            key={task.id}
            index={index}
            task={task}
            onCheck={checkTask}
            onUpdate={changeTask}
            onDelete={deleteTask}
          />
        ))}
    </div>
  );
}

export default App;
