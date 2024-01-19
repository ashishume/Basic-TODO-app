import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Login from '../components/Auth/login';
import App from '../App';
import Signup from '../components/Auth/signup';
import PrivateRoute from './private-route';
import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import { Axios } from '../services/http-service';

const RoutePaths = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await Axios.get('/validate');
        if (response.status === 200) {
          setIsLoggedIn(response.data.isLoggedIn);
        }
      } catch (e: any) {
        setIsLoggedIn(e.response.data.isLoggedIn);
      }
    };
    checkLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <App />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
