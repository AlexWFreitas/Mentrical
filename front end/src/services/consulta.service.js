import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const DOCTOR_API_URL = "http://localhost:8080/api/doctors/";
const TREATMENT_API_URL = "http://localhost:8080/api/treatments/";

const getConsultasFromDoctor = (id) => {
	return axios.get(DOCTOR_API_URL + `${id}/schedules`, { headers: authHeader() }
	);
};

const deleteConsultaById = (idConsulta) => {
	return axios.delete(API_URL + `schedules/${idConsulta}` , { headers: authHeader() }
	);
}

const getPatientsFromDoctor = (id) => {
	return axios.get(DOCTOR_API_URL + `${id}/patients`, { headers: authHeader() }
	);
}

const postSchedule = (idTreatment, dataConsulta) => {
	return axios.post(TREATMENT_API_URL + `${idTreatment}`, { dataConsulta}, { headers: authHeader() } 
	);
}

const updateSchedule = (idConsulta, scheduleDate, scheduleNotes, status) => { 
	return axios.put(API_URL + `schedules/${idConsulta}`, { scheduleDate, status, scheduleNotes}, { headers: authHeader() } 
	);
}

export default {
  getConsultasFromDoctor,
  deleteConsultaById,
  getPatientsFromDoctor,
  postSchedule,
  updateSchedule,
};
