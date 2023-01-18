import { useState } from 'react';

function CreateArea(props) {
  const [task, setTask] = useState({
    content: '',
    status: false,
  });

  function handleChange(event) {
    setTask({
      content: event.target.value,
      status: false,
    });
  }

  function submitTask() {
    props.onAdd(task);
    setTask({
      content: '',
      status: false,
    });
  }

  return (
    <div className="row">
      <div className="col">
        <input
          className="form-control form-control-lg"
          onChange={handleChange}
          name="content"
          value={task && task.content}
        />
      </div>
      <div className="col-auto">
        <button onClick={submitTask} className="btn btn-lg btn-success">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default CreateArea;
