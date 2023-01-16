import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ItemList(props) {
    const task = props.task;

    function handleCheck() {
        props.onCheck(task.id);
    }

    function handleUpdate() {
        props.onUpdate(task);
    }

    function handleDelete() {
        props.onDelete(task.id);
    }

    return (
        <div key={task.id} className="col taskBg">
        <div className={task.status ? "done" : ""}>
          <span className="taskNumber">{task.id}</span>
          <span className="taskContent">{task.content}</span>
        </div>
        <div className="iconsWrap">
          <span title="Completed / Not Completed">
            <FontAwesomeIcon onClick={handleCheck} icon={faCircleCheck} />
          </span>
          {!task.status && <span title="Edit">
            <FontAwesomeIcon onClick={handleUpdate} icon={faPen} />
          </span>}
          <span title="Delete">
            <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} />
          </span>
        </div>
      </div>
    );
}

export default ItemList;