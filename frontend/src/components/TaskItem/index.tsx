import React from 'react';
import { TASK_STATUS } from '../../constants/tasks';
import { ITask } from '../../models/task';

const InputForm = ({
  taskStatus,
  handleCheckboxEvent,
  _id,
  title,
  createdAt,
  expandTask,
}: {
  taskStatus: string | undefined;
  handleCheckboxEvent: (e: any, _id: string) => void;
  _id: string;
  title: string | undefined;
  createdAt: string;
  expandTask: () => void;
}) => {
  return (
    <>
      <div className="list-content__checkbox-container">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={taskStatus === TASK_STATUS.DONE}
          onChange={(e) => handleCheckboxEvent(e, _id)}
        />
      </div>
      <div className="list-content__title-container">
        <div
          className={`list-content__title-container--title ${
            taskStatus === TASK_STATUS.DONE ? 'text-strike' : null
          }`}
        >
          {title}
        </div>
        <div
          className={`list-content__title-container--date  ${
            taskStatus === TASK_STATUS.DONE ? 'gray-text' : null
          }`}
        >
          {new Date(createdAt).toDateString()}
        </div>
      </div>
      <div className="view-more-icon" onClick={expandTask}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
    </>
  );
};

export default InputForm;
