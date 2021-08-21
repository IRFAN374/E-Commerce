import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PrivatePage.css";

const PrivatePage = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  //const [user, setuser] = useState("");

  useEffect(() => {
    if(!localStorage.getItem('authToken')){
      history.push('/login')
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:5000/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  const logoutHandler = ()=>{
    localStorage.removeItem('authToken');
    history.push('/login')
  }
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
     <div style={{background: "green", color:"white"}}><h1>{privateData}</h1></div>
      <div>
        <h2> Welcome to DashBaord page</h2>
        <button onClick={logoutHandler}>logout</button>
      </div>
    </>
  );
};

export default PrivatePage;