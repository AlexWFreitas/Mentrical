
import axios from "axios";
import authHeader from "./auth-header";

// http://localhost:8080/api/doctors/1/patients

const API_URL = "http://localhost:8080/api/doctors/";
const PATIENT_DATA_API_URL = "http://localhost:8080/api/patients/";

const getPatientsFromDoctor = (id) => {
	return axios.get(API_URL + `${id}/patients`, { headers: authHeader() }
	);
};

const getJournalsFromPatient = (id) => {
	return axios.get(PATIENT_DATA_API_URL + `${id}/journals`, { headers: authHeader() }
	);
};


export default {
  getPatientsFromDoctor,
  getJournalsFromPatient,
};
