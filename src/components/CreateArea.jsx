import { useEffect, useState } from 'react';

function CreateArea({ onAdd, handleUpdate, text, setText }) {
  const [task, setTask] = useState('');

  useEffect(() => {
    setTask(text?.content);
  }, [text]);

  function handleChange(event) {
    setTask(event.target.value);
  }

  function submitTask() {
    onAdd(task);
    setTask({
      content: '',
      status: false,
    });
  }

  const handleCancel = () => {
    setTask('');
    setText('');
  };

  return (
    <div className="row">
      <div className="col">
        <input
          className="form-control form-control-lg"
          onChange={handleChange}
          name="content"
          value={task}
        />
      </div>
      {!text ? (
        <div className="col-auto">
          <button onClick={submitTask} className="btn btn-lg btn-success">
            Add Task
          </button>
        </div>
      ) : (
        <div className="col-auto">
          <button
            onClick={() => {
              handleUpdate({ ...text, content: task });
              setTask('');
            }}
            className="btn btn-lg btn-success mr-20"
          >
            Update
          </button>
          <button onClick={handleCancel} className="btn btn-lg btn-warning">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateArea;
