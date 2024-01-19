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
const AddTaskModal = ({
  setOpen, //title
  //   description,
} //   onSubmitTask,
: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  //   title: string;
  //   description: string;
  //   onSubmitTask: (e: MouseEventHandler<HTMLButtonElement>) => void;
}) => {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  let contentEditableRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      (contentEditableRef.current as any).focus();
    }
  }, []);

  function submitModalData(e:any) {
    e.preventDefault();
    console.log({
      title: content,
      description,
    });
  }

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
                placeholder="Start typing title..."
                value={content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContent(e.target.value)
                }
              />
              <textarea
                className="editable-description"
                placeholder="Description as well..."
                value={description}
                rows={5}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              ></textarea>
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
