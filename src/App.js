import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Layout/Navbar';
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import axios from "axios";
import baseUrl from "./utils/baseUrl";
import cookie from "js-cookie";
import Create from './pages/Create';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLoggedUser = async () => {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: cookie.get("token") },
      });
      setUser(res.data.user);
    };
    getLoggedUser();
  }, []);

  return (
    <Router>
     
      <Route exact path="/">
      <Navbar/>
        <HomePage user={user} />
      </Route>
      <Route exact path="/signup">
      <Navbar/>
        <SignUp />
      </Route>
      <Route exact path="/login">
      <Navbar/>
        <Login />
      </Route>
      <Route exact path="/stream/:username">
        <VideoPage user={user} />
      </Route>
      <Route exact path="/create">
       <Navbar/>
        <Create />
      </Route>
    </Router>
  );
}

export default App;
