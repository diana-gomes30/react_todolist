export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHECK':
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.id ? { ...task, status: !task.status } : task
        ),
      };

    case 'ADD':
      return {
        ...state,
        taskList: [
          ...state.taskList,
          {
            id:
              state.taskList.length > 0
                ? state.taskList[state.taskList.length - 1].id + 1
                : 1,
            content: action.task.content,
            status: action.task.status,
          },
        ],
      };

    case 'UPDATE':
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.task.id
            ? { ...task, content: action.task.content }
            : task
        ),
      };

    case 'DELETE':
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.id),
      };

    case 'UPDATING-TASK':
      return { ...state, updatingTask: action.task };

    case 'CHANGE-TO-UPDATE':
      return { ...state, isEditingTask: true };

    case 'CANCEL-UPDATE':
      return { ...state, isEditingTask: false };
    default:
      return state;
  }
};
