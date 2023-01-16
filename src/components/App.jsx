import React, { useState } from "react";
import UpdateArea from "./UpdateArea";
import CreateArea from "./CreateArea";
import ItemList from "./ItemList";

function App() {

  // Tasks (ToDo List) State
  const [taskList, setTaskList] = useState([
    {"id": 1, "content": "Task 1", "status": false},
    {"id": 2, "content": "Task 2", "status": true}
  ]);

  const [updatingTask, setUpdatingTask] = useState({
    "id": 0, "content": "", "status": false
  });

  const [isEditingTask, setIsEditingTask] = useState(false);

  // Add Task
  function addTask(newTask) {
    newTask.id = taskList.length + 1;
    setTaskList(prevTasks => [...prevTasks, newTask]);
  }

  // Delete Task 
  function deleteTask(id) {
    setTaskList(prevTasks => prevTasks.filter(
      (taskItem => taskItem.id !== id)
    ))
  }

  // Mark task done or completed
  function checkTask(id) {
    setTaskList(prevTasks => prevTasks.map(prevTask => {
      if (prevTask.id === id) {
        return { ...prevTask, "status": !prevTask.status };
      }

      return prevTask;
    }));
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
      "id": 0, "content": "", "status": false
    });
  }

  // Update Task
  function updateTask(task) {
    setTaskList(prevTasks => prevTasks.map(prevTask => {
      if (prevTask.id === task.id) {
        return { ...prevTask, "content": task.content };
      }

      return prevTask;
    }));

    cancelUpdate();
  }

  return (
    <div className="container app">
      <br /><br />
      <h1>To Do List App</h1>
      <br /><br />

      {
        /* Update Task / Add Task */
        isEditingTask 
          ? <UpdateArea 
              onUpdate={updateTask} 
              onCancel={cancelUpdate} 
              updatingTask={updatingTask}
            /> 
          : <CreateArea onAdd={addTask} />
      }

      <br/>

      {/* Display Task List */}
      {taskList.length === 0 && <p>No Tasks...</p>}
      {taskList
        .sort((a,b) => a.id > b.id ? 1 : -1)
        .map((task, index) => (
          <ItemList 
            key={task.id}
            index={index}
            task={task}
            onCheck={checkTask}
            onUpdate={changeTask}
            onDelete={deleteTask}
          />
        ))
      }

    </div> 
  );
}

export default App;
