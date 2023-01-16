import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faP, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Diversity1Outlined } from "@mui/icons-material";
import UpdateArea from "./UpdateArea";
import CreateArea from "./CreateArea";

function App() {

  // Tasks (ToDo List) State
  const [taskList, setTaskList] = useState([
    {"title": "Task 1", "status": false},
    {"title": "Task 2", "status": true}
  ]);

  // Add Task
  function addTask(newTask) {
    setTaskList(prevTasks => [...prevTasks, newTask]);
  }

  // Delete Task 
  function deleteTask(id) {

  }

  // Mark task done or completed
  function markTask(id) {

  }

  // Change task for update
  function changeTask(event) {

  }

  // Cancel Update
  function cancelUpdate() {

  }

  // Update Task
  function updateTask() {

  }

  return (
    <div className="container app">
      <br /><br />
      <h1>To Do List App</h1>
      <br /><br />

      {/* Update Task */}
      <UpdateArea />

      <br/>

      {/* Add Task */}
      <CreateArea />

      <br/>

      {/* Display Task List */}
      {taskList.length === 0 && <p>No Tasks...</p>}
      {taskList
        .map((task, index) => (
          <React.Fragment key={index}>
            <div className="col taskBg">
              <div className={task.status ? "done" : ""}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskTitle">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                <span title="Edit">
                  <FontAwesomeIcon icon={faPen} />
                </span>
                <span title="Delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </React.Fragment>
        ))
      }

    </div> 
  );
}

export default App;
