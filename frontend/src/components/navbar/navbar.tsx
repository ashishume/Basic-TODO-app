import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { searchTasks } from '../../store/slices/tasksSlice';
const Navbar = ({
  searchValue = '',
  isFocused = false,
}: {
  searchValue: string;
  isFocused: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocus] = useState(false);
  const [isMenuVisible, showMenu] = useState(false);
  async function logOutUser() {
    const response = await Axios.post('/logout');
    if (response.status === 200) {
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    setFocus(true);
    if (event.key === 'Enter') {
      onSearch();
    }
  }
  function onSearch() {
    const value = inputRef?.current?.value;
    dispatch(searchTasks(value as any));
    navigate(`/search?searchValue=${value}`);
  }

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = searchValue;
      if (searchValue?.length) {
        dispatch(searchTasks(searchValue));
      }
    }
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [inputRef?.current?.value, isFocused]);

  return (
    <div className="navbar-container">
      <div className="menu-items">
      </div>
      <div className="right-items">
        <ul>
          <li>
            <div
              className={`search-input-field-container ${
                focused ? 'active-search' : ''
              }`}
              onClick={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <input
                className="search-input-field"
                ref={inputRef}
                onKeyDown={handleKeyDown}
                placeholder="Search tasks..."
              />
              <span onClick={onSearch}>
                <SearchOutlinedIcon />
              </span>
            </div>
          </li>

          <li
            className="icon-right logout-button"
            onClick={() => showMenu(!isMenuVisible)}
          >
            <Person2OutlinedIcon />

            <div
              className={`logout-menu ${isMenuVisible ? 'visible' : ''}`}
              onClick={() => logOutUser()}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
