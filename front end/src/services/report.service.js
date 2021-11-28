import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/reports/";

const getReports = () => {
  return axios.get(API_URL, { headers: authHeader() }

  );
};

const postReport = (idUser, reportTitle, reportMessage, mood) => {
	return axios.post(API_URL, 
		{ 
			idUser,
			reportTitle,
			reportMessage,
			mood,
		},
		{
			headers: authHeader(),
		}
	);
};

const getReport = (id) => {
	return axios.get(API_URL + `${id}`, 
		{ 
			headers: authHeader() 
		}
	);

}

const updateReport = (id, reportTitle, reportMessage, mood) => {
	return axios.put(API_URL + `${id}`, 
		{
			reportTitle,
			reportMessage,
			mood
		},
		{
			headers: authHeader()
		}
	);
}

const deleteReport = (idReport) => {
	return axios.delete(API_URL + `${idReport}`,
	{
		headers: authHeader()
	});
}

export default {
  getReports,
  postReport,
  getReport,
  updateReport,
  deleteReport,
};
