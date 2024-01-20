import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuVisible, showMenu] = useState(false);
  async function logOutUser() {
    const response = await Axios.post('/logout');
    if (response.status === 200) {
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }


  return (
    <div className="navbar-container">
      <div className="menu-items">
      </div>
      <div className="right-items">
        <ul>
          <li>
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
