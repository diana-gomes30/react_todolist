import { useState, useEffect } from 'react';
import UpdateArea from './UpdateArea';
import CreateArea from './CreateArea';
import ItemList from './ItemList';

function App() {
  var [taskList, setTaskList] = useState([]);

  const [updatingTask, setUpdatingTask] = useState({
    id: 0,
    content: '',
    status: false,
  });

  const [isEditingTask, setIsEditingTask] = useState(false);

  useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem('tasks')));
  }, []);

  function getTasks() {
    return localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : [];
  }

  // Add Task
  function addTask(newTask) {
    var tasks = getTasks();
    newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    tasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    setTaskList(JSON.parse(localStorage.getItem('tasks')));
  }

  // Delete Task
  function deleteTask(id) {
    var tasks = getTasks().filter((task) => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    setTaskList(JSON.parse(localStorage.getItem('tasks')));
  }

  // Mark task done or completed
  function checkTask(id) {
    const tasks = getTasks();

    const newList = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );

    localStorage.setItem('tasks', JSON.stringify(newList));

    setTaskList(JSON.parse(localStorage.getItem('tasks')));
  }

  // Update Task
  function updateTask(updateTask) {
    const tasks = getTasks();

    const newList = tasks.map((task) =>
      task.id === updateTask.id
        ? { ...task, content: updateTask.content }
        : task
    );

    localStorage.setItem('tasks', JSON.stringify(newList));

    setTaskList(JSON.parse(localStorage.getItem('tasks')));

    cancelUpdate();
  }

  // Change task for update
  function changeTask(task) {
    setUpdatingTask(task);
    setIsEditingTask(true);
  }

  // Cancel Update
  function cancelUpdate() {
    setIsEditingTask(false);
    setUpdatingTask({
      id: 0,
      content: '',
      status: false,
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
        isEditingTask ? (
          <UpdateArea
            onUpdate={updateTask}
            onCancel={cancelUpdate}
            updatingTask={updatingTask}
          />
        ) : (
          <CreateArea onAdd={addTask} />
        )
      }

      <br />

      {/* Display Task List */}
      {!taskList.length && <p>No Tasks...</p>}
      {taskList
        ?.sort((a, b) => (a.id > b.id ? 1 : -1))
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
