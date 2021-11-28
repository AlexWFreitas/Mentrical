import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import ReportService from "../../services/report.service";
import TableRow from "./ReportRow";

const Reports = () => {
  const [content, setContent] = useState("");
  const [reports, setReports] = useState([]);

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
    ReportService.GetReports().then(
      (response) => {
        setReports(response.data);
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
      <Table striped bordered hover style={{marginTop: "5rem"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Relato</th>
            <th>Criador</th>
            <th>Data do Relato</th>
          </tr>
        </thead>
        
        <tbody>
        {
          reports.map( (report) =>  (
            <TableRow key={report.id} report={report}/>
          ))
        }
        </tbody>
      </Table>
    </div>
  );
};

export default Reports;
