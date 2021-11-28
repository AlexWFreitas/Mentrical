import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import ReportService from "../../services/report.service";

const ReportDetails = (props) => {
	const [content, setContent] = useState("");
	const [report, setReport] = useState("");
	const { id } = useParams();

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

	
	useEffect(() => {
		ReportService.getReport(id).then(
		  (response) => {
			setReport(response.data);
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
		<div className="container">
			<header className="jumbotron">
				<h3>{content}</h3>
			</header>
		</div>
		);
	}

	return (
		<div className="container">
			<div class="card-large" style={{ marginTop: "2rem" }}>
				<div class="card-header">
					{report.location}
				</div>
				<div class="card-body">
					<h5 class="card-title">{report.reportTitle}</h5>
					<p class="card-text">{report.reportMessage}</p>
					<p>Criado por {report.creatorName}</p>
				</div>
				<div class="card-footer text-muted">
					{report.createdDate}
				</div>
			</div>
		</div>
	)
}

export default ReportDetails;