import { useState } from 'react';
import CreateArea from './CreateArea';
import ItemList from './ItemList';

function App() {
  // Tasks (ToDo List) State
  const [taskList, setTaskList] = useState([
    { id: 1, content: 'Task 1', status: false },
    { id: 2, content: 'Task 2', status: true },
  ]);
  const [idToEdit, setIdToEdit] = useState(0);

  // Add Task
  function addTask(newTask) {
    newTask.id = taskList.length + 1;
    setTaskList((prevTasks) => [...prevTasks, newTask]);
  }

  // Delete Task
  function deleteTask(id) {
    setTaskList((prevTasks) =>
      prevTasks.filter((taskItem) => taskItem.id !== id)
    );
  }

  // Mark task done or completed
  function checkTask(id) {
    setTaskList((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, status: !prevTask.status }
          : prevTask
      )
    );
  }

  function updateTask(task) {
    setIdToEdit('');
    setTaskList((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...prevTask, content: task.content }
          : prevTask
      )
    );
  }

  const handleUpdate = (id) => setIdToEdit(id);

  return (
    <div className="container app">
      <br />
      <br />
      <h1>To Do List App</h1>
      <br />
      <br />

      <CreateArea
        onAdd={addTask}
        handleUpdate={updateTask}
        text={taskList.filter(({ id }) => id === idToEdit)[0]}
        setText={setIdToEdit}
      />

      <br />

      {/* Display Task List */}
      {taskList.length === 0 && <p>No Tasks...</p>}
      {taskList
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map((task) => (
          <ItemList
            key={task.id}
            task={task}
            onCheck={checkTask}
            onUpdate={() => handleUpdate(task.id)}
            onDelete={deleteTask}
          />
        ))}
    </div>
  );
}

export default App;
