import React, { useState } from "react";

function UpdateArea(props) {
    // Temp State
    const [taskInUpdate, setTaskInUpdate] = useState("");
    
    return (
        <div className="row">
            <div className="col">
                <input className="form-control form-control-lg" />
            </div>
            <div className="col-auto">
                <button className="btn btn-lg btn-success mr-20">
                    Update
                </button>
                <button className="btn btn-lg btn-warning">
                    Cancel
                </button>
            </div>
      </div>
    );
}

export default UpdateArea;