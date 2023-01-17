import { useReducer } from "react";
import UpdateArea from "./UpdateArea";
import CreateArea from "./CreateArea";
import ItemList from "./ItemList";

const initialTasks = [
  {
    "id": 1, 
    "content": "Task 1", 
    "status": false
  },
  {
    "id": 2, 
    "content": "Task 2", 
    "status": true
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK":
      return state.map((task) => (
        (task.id === action.id) 
          ? { ...task, status: !task.status }
          : task  
      ));

    case "ADD":
      return [
        ...state, 
        {
          id: state.length > 0 ? state[state.length - 1].id + 1 : 1, 
          content: action.task.content, 
          status: action.task.status
        }
      ];

    case "UPDATE":
      return state.map((task) => (
        (task.id === action.task.id) 
          ? { ...task, content: action.task.content }
          : task  
      ));

    case "DELETE":
      return state.filter((task => task.id !== action.id));

    case "UPDATING-TASK":
        return action.task;

    case "CHANGE-TO-UPDATE":
        return true;

    case "CANCEL-UPDATE":
        return false;
    default:
      return state;
  }
}

function App() {

  // Tasks (ToDo List) State
  const [taskList, dispatch] = useReducer(reducer, initialTasks);
  const [updatingTask, dispatch2] = useReducer(reducer, {});
  const [isEditingTask, dispatch3] = useReducer(reducer, false);

  // Add Task
  const addTask = (newTask) => {
    dispatch({ type: "ADD", task: newTask });
  }

  // Delete Task 
  const deleteTask = (id) => {
    dispatch({ type: "DELETE", id: id });
  }

  // Mark task done or completed
  const checkTask = (id) => {
    dispatch({ type: "CHECK", id: id });
  }

  // Update Task
  const updateTask = (task) => {
    dispatch({ type: "UPDATE", task: task });
    cancelUpdate();
  }

  // Change task for update
  function changeTask(task) {
    dispatch2({ type: "UPDATING-TASK", task: task});
    dispatch3({ type: "CHANGE-TO-UPDATE" });
  }

  // Cancel Update
  function cancelUpdate() {
    dispatch3({ type: "CANCEL-UPDATE" });
    dispatch2({ 
      type: "UPDATING-TASK", 
      task: {
        "id": 0, 
        "content": "", 
        "status": false
      }
    });
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
