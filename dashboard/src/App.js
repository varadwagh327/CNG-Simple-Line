import  { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import AddNewPump from './components/AddNewPump.jsx';
import AddNewAdmin from './components/AddNewAdmin.jsx';
import Pumps from './components/Pumps.jsx';
import Messages from './components/Messages.jsx';
import Sidebar from './components/Sidebar.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './index';
import axios from "axios";

function App() {
 const {isAuthenticated,  setIsAuthenticated, setUser} = useContext(Context);

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/admin/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);



  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/doctor/addnew' element={<AddNewPump/>} />
        <Route path='/admin/addnew' element={<AddNewAdmin/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/doctors' element={<Pumps/>} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
    </>
  );
}

export default App;