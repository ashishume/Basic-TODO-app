import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTasks,
  updateTasks,
  updateCheckedStatus,
  createTasks,
} from '../../store/slices/tasksSlice';
import SpinningLoader from '../SpinningLoader';
import { TASK_STATUS } from '../../constants/tasks';
import AddTaskModal from '../Modal';
import { ITask } from '../../models/task';
const InputField = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasksSlice);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const handleCheckboxEvent = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string | null
  ) => {
    const isChecked = e.target.checked;
    if (id) {
      await dispatch(
        updateCheckedStatus({
          id,
          taskStatus: isChecked ? TASK_STATUS.DONE : TASK_STATUS.INPROGRESS,
        })
      );
      await dispatch(
        updateTasks({
          id,
          taskStatus: isChecked ? TASK_STATUS.DONE : TASK_STATUS.INPROGRESS,
        })
      );
    }
  };

  const onSubmitTask = async (formData: ITask) => {
    await setOpen(false);
    await dispatch(createTasks({ ...formData, taskStatus: TASK_STATUS.TODO }));
    await dispatch(fetchTasks());
  };

  return (
    <>
      {isOpen ? (
        <AddTaskModal onSubmitTask={onSubmitTask} setOpen={setOpen} />
      ) : null}
      <div className="form-container">
        <div className="todo-task-container">
          <button onClick={openModal} className="add-task-btn">
            Add Task
          </button>
          <select className="select-filter">
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="list-data-container">
          {!isLoading ? (
            tasks.map(({ _id, title, description, taskStatus, createdAt }) => {
              return (
                <div className="list-content" key={_id}>
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
                </div>
              );
            })
          ) : (
            <SpinningLoader />
          )}
        </div>
      </div>
    </>
  );
};

export default InputField;
