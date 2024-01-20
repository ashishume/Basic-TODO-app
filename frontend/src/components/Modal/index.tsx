import React, {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import './style.scss';
import { ITask } from '../../models/task';
const AddTaskModal = ({
  setOpen,
  onSubmitTask,
  data,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmitTask: (e: any) => void;
  data: ITask | null;
}) => {
  const [formData, setFormData] = useState({
    title: data?.title || '',
    description: data?.description || '',
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  let contentEditableRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      (contentEditableRef.current as any).focus();
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function submitModalData(e: any) {
    e.preventDefault();
    if (validateForm()) {
      onSubmitTask(formData);
    }
  }

  const validateForm = () => {
    const newErrors: any = {};

    // Check for required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Add validations for other fields if needed
    setErrors(newErrors);

    if (newErrors?.title || newErrors?.description) return false;

    return true;
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="heading">Add task</h2>
          <div className="form-container">
            <form>
              <input
                ref={contentEditableRef}
                className="editable-content"
                name="title"
                placeholder="Start typing title..."
                value={formData.title}
                onChange={handleChange}
              />
              <div style={{ color: 'red' }}>{errors.title}</div>
              <textarea
                className="editable-description"
                placeholder="Description as well..."
                value={formData.description}
                name="description"
                rows={5}
                onChange={handleChange}
              ></textarea>
              <div style={{ color: 'red' }}>{errors.description}</div>
              <button
                className="add-task-btn"
                onClick={(e) => submitModalData(e)}
              >
                Submit
              </button>
              <button
                onClick={() => setOpen(false)}
                className="close-btn"
                style={{
                  float: 'right',
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
