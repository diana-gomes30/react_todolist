import React, { useState } from  "react";

function CreateArea(props) {
    // Temp State
    const [task, setTask] = useState({});

    return (
        <div className="row">
            <div className="col">
                <input className="form-control form-control-lg" />
            </div>
            <div className="col-auto">
                <button className="btn btn-lg btn-success">
                Add Task
                </button>
            </div>
        </div>
    );
}

export default CreateArea;