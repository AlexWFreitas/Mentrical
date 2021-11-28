import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/test/";
const ALT_API_URL = "http://localhost:8080/api/users/";

const getPublicContent = () => {
  return axios.get(API_URL + "all", { headers:authHeader() });
};

const getPatientBoard = () => {
  return axios.get(API_URL + "patient", { headers: authHeader() });
};

const getDoctorBoard = () => {
  return axios.get(API_URL + "doctor", { headers: authHeader() });
};

const updateUserProfile = (idUser, firstName, lastName, email, contactNumber) => {

  return axios.put(ALT_API_URL + `${idUser}`, { 
      firstName, lastName, email, contactNumber
    },  { 
      headers: authHeader() 
    }
  );
};

export default {
  getPublicContent,
  getPatientBoard,
  getDoctorBoard,
  updateUserProfile,
};