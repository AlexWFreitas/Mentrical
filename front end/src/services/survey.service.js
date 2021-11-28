import axios from "axios";
import authHeader from "./auth-header";

// http://localhost:8080/api/doctors/1/patients

const TREATMENT_API_URL = "http://localhost:8080/api/treatments/";
const PATIENT_DATA_API_URL = "http://localhost:8080/api/patients/";

const getSurveysFromPatient = (id) => {
	return axios.get(PATIENT_DATA_API_URL + `${id}/surveys/`, { headers: authHeader() }
	);
};


export default {
	getSurveysFromPatient,
};
