import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

function ItemList({
  task: { id, status, content },
  onCheck,
  onDelete,
  onUpdate,
}) {
  function handleCheck() {
    onCheck(id);
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <div key={id} className="col taskBg">
      <div className={status ? 'done' : ''}>
        <span className="taskNumber">{id}</span>
        <span className="taskContent">{content}</span>
      </div>
      <div className="iconsWrap">
        <span title="Completed / Not Completed">
          <FontAwesomeIcon onClick={handleCheck} icon={faCircleCheck} />
        </span>
        {!status && (
          <span title="Edit">
            <FontAwesomeIcon onClick={onUpdate} icon={faPen} />
          </span>
        )}
        <span title="Delete">
          <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} />
        </span>
      </div>
    </div>
  );
}

export default ItemList;
