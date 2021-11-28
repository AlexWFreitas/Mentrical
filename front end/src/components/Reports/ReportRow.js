import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReportRow = (props) => {

	let dateString = props.report.createdDate;
	let dateParse = Date.parse(dateString);
	let date = new Date(dateParse);

	let year = date.getFullYear();
	let month = `${date.getMonth() +1}`.padStart(2,"0");
	let day = `${date.getMonth() +1}`.padStart(2,"0");
	let hour = `${date.getHours()}`.padStart(2,"0");
	let minutes = `${date.getMinutes()}`.padStart(2,"0");;

	return (
		<tr>
			<td><Link to={`/reports/${props.report.id}`} className="text-reset text-decoration-none">{props.report.id}</Link></td>
			<td><Link to={`/reports/${props.report.id}`} className="text-reset text-decoration-none">{props.report.reportTitle}</Link></td>
			<td><Link to={`/reports/${props.report.id}`} className="text-reset text-decoration-none">{props.report.creatorName}</Link></td>
			<td><Link to={`/reports/${props.report.id}`} className="text-reset text-decoration-none">{`${month}/${day}/${year} ${hour}:${minutes}`}</Link></td>
		</tr>
	)
}

export default ReportRow;