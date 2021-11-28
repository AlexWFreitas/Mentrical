import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import HomeDoctor from "../pages/HomeDoctor";
import Login from "./User/Login";
import PatientJournalsPatient from "../pages/patients/PatientJournalsPatient";

import EventBus from "../common/EventBus";


import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  if (content != "Authenticated")
	{
        return (
            <Login/>
        );
	}

  return (
    <div className="col-md-12 d-flex flex-grow-1" style={{alignItems:"center", justifyContent:'center'}}>
      {user.roles[0] === "ROLE_DOCTOR"
      ? <HomeDoctor/> 
      : <PatientJournalsPatient/> }
    </div>
  );
};

export default Home;
