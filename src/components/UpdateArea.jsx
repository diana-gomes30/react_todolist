import { useState } from "react";

function UpdateArea(props) {
    const [taskInUpdate, setTaskInUpdate] = useState(props.updatingTask);

    function handleChange(event) {
        const content = event.target.value;

        setTaskInUpdate(prevTask => ({
            "id": prevTask.id,
            "content": content,
            "status": prevTask.status
        }));
    }

    function handleUpdate() {
        props.onUpdate(taskInUpdate);
    }

    function handleCancel() {
        props.onCancel();
    }

    return (
        <div className="row">
            <div className="col">
                <input onChange={handleChange} className="form-control form-control-lg" value={taskInUpdate && taskInUpdate.content} />
            </div>
            <div className="col-auto">
                <button onClick={handleUpdate} className="btn btn-lg btn-success mr-20">
                    Update
                </button>
                <button onClick={handleCancel} className="btn btn-lg btn-warning">
                    Cancel
                </button>
            </div>
      </div>
    );
}

export default UpdateArea;