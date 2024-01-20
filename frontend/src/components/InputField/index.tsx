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
  filterData,
} from '../../store/slices/tasksSlice';
import SpinningLoader from '../SpinningLoader';
import { TASK_STATUS, options } from '../../constants/tasks';
import AddTaskModal from '../Modal';
import { ITask } from '../../models/task';
import InputForm from '../TaskItem';
const InputField = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasksSlice);
  const [isOpen, setOpen] = useState(false);
  const [isFilterActive, setFilter] = useState(false);
  const [data, setData] = useState<ITask | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const openModal = () => {
    /** clear the previous data if any */
    setData(null);
    setOpen(true);
  };

  /** mark any task completed if any */
  const handleCheckboxEvent = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string | null
  ) => {
    e.stopPropagation();
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

  /** view more details on each task */
  const expandTask = (task: ITask) => {
    setOpen(true);
    setData(task);
  };

  /**
   * submit the task when form is filled
   * @param formData
   */
  const onSubmitTask = async (formData: ITask) => {
    await setOpen(false);
    await dispatch(createTasks({ ...formData, taskStatus: TASK_STATUS.TODO }));
    await dispatch(fetchTasks());
  };

  /**
   * filter data based on dropdown menu
   * @param e
   */
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    if (val) {
      setFilter(true);
      dispatch(filterData(val));
    }
  };

  /**
   * clear the filter when all tasks need to be visible
   */
  const removeFilter = async () => {
    await dispatch(fetchTasks());
    await setFilter(false);
  };

  return (
    <>
      {isOpen ? (
        <AddTaskModal
          data={data}
          onSubmitTask={onSubmitTask}
          setOpen={setOpen}
        />
      ) : null}
      <div className="form-container">
        <div className="todo-task-container">
          <button onClick={openModal} className="add-task-btn">
            Add Task
          </button>
          {isFilterActive && (
            <div className="remove-filter-btn" onClick={removeFilter}>
              Remove filter
            </div>
          )}
          <select className="select-filter" onChange={handleFilter}>
            {options.map(({ label, key }) => {
              return <option key={key}>{label}</option>;
            })}
          </select>
        </div>
        <div className="list-data-container">
          {!isLoading ? (
            tasks.map(({ _id, title, description, taskStatus, createdAt }) => {
              return (
                <div className="list-content" key={_id}>
                  <InputForm
                    taskStatus={taskStatus}
                    handleCheckboxEvent={handleCheckboxEvent}
                    _id={_id}
                    title={title}
                    createdAt={createdAt}
                    expandTask={() =>
                      expandTask({
                        _id,
                        title,
                        description,
                        taskStatus,
                        createdAt,
                      })
                    }
                  />
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
