import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const ExperimentalPage = () => {
	return (
		<Container>
			<div class="px-4 py-5 my-5 text-center">
			<h1 class="display-5 fw-bold">Mood Tracker</h1>
			<div class="col-lg-6 mx-auto">
				<p class="lead mb-4">Através do uso de ferramentas de visualização de dados como PowerBI ou Chart.js, podemos conseguir visualizar os dados das respostas aos questionários de humor sobre como eles tem se sentido em relação a cada emoção ao longo do tratamento.</p>
				<div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
				</div>
			</div>
			</div>

			<div class="b-example-divider"></div>


			<iframe width="1400" height="1080" src="https://app.powerbi.com/view?r=eyJrIjoiZjZmNGRmYTgtM2NjZS00NDgwLWE5MDgtNjk3MmU5MWE3OWY2IiwidCI6ImVjY2U3N2ZhLThhOWYtNDYzMC05MDNmLTg0YmVmNzZiZTliNyJ9&pageName=ReportSectiond2eb62aa768cf5a3d4f2" frameborder="0" allowFullScreen="true"></iframe>
		
		</Container>
	)
}

export default ExperimentalPage;