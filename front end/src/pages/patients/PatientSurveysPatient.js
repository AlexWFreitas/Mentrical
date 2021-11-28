import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import DeleteModal from "../../components/Modal/DeleteModal";
import ConsultaService from "../../services/consulta.service";
import SurveyService from "../../services/survey.service";


// Creating Modals
function MedicalRecordModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className={"titleContainer"} style={{paddingLeft: 0}}>
            {props.infos.surveyAnswer.surveyName}
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
		{ props.infos ? props.infos.surveyQuestions.map((item, index) => {
			console.log(item);
			console.log(props.infos.surveyAnswer);
			return (
				<Form.Group key={index} className="mb-3" controlId="formBasicCheckbox">
					<div>
					<Form.Label className="h5">{index + 1}. {item.question}</Form.Label>
					{ item.questionAnswers.map((answer, indexAnswer) => {
						console.log(props.infos.surveyAnswer.surveyUserAnswers.filter(answerUser => answerUser.idQuestion === item.id))
						return (
							<div class="form-check">
								{ 
									props.infos.surveyAnswer.surveyUserAnswers.filter(answerUser => answerUser.idQuestion === item.id)[0].idChosenAnswer === answer.id ?
									(
										<>
											<input class="form-check-input" type="radio" name={`question-${item.id}`} id={answer.id} value="{answer.points}" disabled checked />
											<label class="form-check-label" for="question-{item.question.id}">
												{answer.value}
											</label>
										</>
									) : 
									(
										<>
											<input class="form-check-input" type="radio" name={`question-${item.id}`} id={answer.id} value="{answer.points}" disabled />
											<label class="form-check-label" for="question-{item.question.id}">
												{answer.value}
											</label>
										</>
									)
								} 
							</div>
						)
					}) }
					</div>
				</Form.Group> 
			)
		}) : null 
		}
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function NewAppointmentModal(props) {
  const [dateSelected, setDateSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [treatmentSelected, setTreatmentSelected] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const onChangeDate = (x) => {
    setDateSelected(x.target.value);
  }

  const onChangeTime = (x) => {
    setTimeSelected(x.target.value);
  }

  const onChangeTreatment = (x) => {
    setTreatmentSelected(x.target.value);
  }

  // Api Request to get Patients
  useEffect(() => {
    ConsultaService.getPatientsFromDoctor(currentUser.id).then(
      (response) => {
        setPacientes(response.data);
      },
      (error) => {
          error.toString();
      }
    );
  }, []);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className={"titleContainer"} style={{paddingLeft: 0}}>
            Escala de Depressão de Beck
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
		{ 
			props.infos ? props.infos.surveyQuestions.map((item, index) => {
			return (
				<Form.Group key={index} className="mb-3" controlId="formBasicCheckbox">
					<div>
					<Form.Label className="h5">{index + 1}. {item.question}</Form.Label>
					{ item.questionAnswers.map((answer, indexAnswer) => {
						return (
							<div class="form-check">
								<input class="form-check-input" type="radio" name={`question-${item.id}`} id={answer.id} value="{answer.points}" />
								<label class="form-check-label" for="question-{item.question.id}">
									{answer.value}
								</label>
							</div>
						)
					}) }
					</div>
				</Form.Group> 
			)
		}) : null 
		}
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(treatmentSelected, (dateSelected.toString() + "T" + timeSelected.toString()))} >Enviar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditAppointmentModal(props) {
  const [dateSelected, setDateSelected] = useState(props.infos.date);
  const [timeSelected, setTimeSelected] = useState(props.infos.time);
  const [statusSelected, setStatusSelected] = useState(props.infos.status);
  const [noteSelected, setNoteSelected] = useState(props.infos.notes);

  const onChangeDate = (x) => {
    setDateSelected(x.target.value);
  }

  const onChangeTime = (x) => {
    setTimeSelected(x.target.value);
  }

  const onChangeStatus = (x) => {
    setStatusSelected(x.target.value);
  }

  const onChangeNote = (x) => {
    setNoteSelected(x.target.value);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className={"titleContainer"} style={{paddingLeft: 0}}>
            Editar Consulta
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicData">
          <div style={{display:"flex", gap: "1rem"}}>
            <Form.Control type="date" value={dateSelected} onChange={onChangeDate} />
            <Form.Control type="time" step="1" value={timeSelected} onChange={onChangeTime}/>
          </div>
        </Form.Group>
        <Form.Select aria-label="Default select example" value={statusSelected} onChange={onChangeStatus}>
          <option value="0">Agendada</option>
          <option value="1">Feita</option>
          <option value="-1">Cancelada</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Anotações</Form.Label>
          <Form.Control as="textarea" rows={3} value={noteSelected} onChange={onChangeNote} /> 
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(props.infos.idConsulta, (dateSelected.toString() + " " + timeSelected.toString()), noteSelected, statusSelected)} disabled={dateSelected === "" || timeSelected === "" || statusSelected === ""}>Atualizar</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Main Component
const PatientSurveysPatient = () => {

  // Default Modal State
  const initialMedicalRecord = {show:false, name:"", date: "", time:"", col:"", annotations: "", idConsulta: 0};

  // Initializing State Holders for Each Modal
  const [showInsert, setShowInsert] = useState(initialMedicalRecord);
  const [showMedicalRecord, setShowMedicalRecord] = useState(initialMedicalRecord);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(initialMedicalRecord);

  // Insert Modal Logic
  const handleInsertClose = () => setShowInsert(initialMedicalRecord);
  const handleInsertShow = (surveyQuestions) => 
  {
	console.log(surveyQuestions)
    setShowInsert({show:true, surveyQuestions});    
  }
  const handleInsertSubmit = (idTreatment, dataConsulta) => {
    ConsultaService.postSchedule(idTreatment, dataConsulta).then(() => 
    { 
      getQueryStatus();
      setShowInsert({initialMedicalRecord}); 
    });
  }

  // Update Modal Logic
  const handleCloseEdit = () => setShowEdit(initialMedicalRecord);
  const handleShowEdit = (idConsulta, date, time, notes, status) => setShowEdit({ show:true, idConsulta, date, time, notes, status })
  const handleSubmitEdit = (idConsulta, dateTime, notes, status) => {
    ConsultaService.updateSchedule(idConsulta, dateTime, notes, status).then(() => 
    { 
      getQueryStatus();
      setShowEdit({initialMedicalRecord}); 
    });
  }
  
  // Delete Modal Logic
  const handleCloseDelete = () => setShowDelete(initialMedicalRecord);
  const handleShowDelete = (date, time, name, col, annotations, id) => setShowDelete({show: true, date, time, name, col, annotations, id});
  const handleSubmitDelete = (idConsulta) => {
    ConsultaService.deleteConsultaById(idConsulta).then(() => 
    { 
      getQueryStatus();
      setShowDelete({initialMedicalRecord}); 
    });
  }

  // Detailed View Modal Logic
  const handleCloseMedicalRecord = () => setShowMedicalRecord(initialMedicalRecord);
  const handleShowMedicalRecord = (surveyQuestions, surveyAnswer) => setShowMedicalRecord({show:true, surveyQuestions, surveyAnswer});

  // Data States
  const { user: currentUser } = useSelector((state) => state.auth);
  const [surveys, setSurveys] = useState();

  // Date and Hour String Generator
  const getHour = (dateTime) => {
    let dateParse = Date.parse(dateTime);
    let date = new Date(dateParse);
  
    let hour = `${date.getHours()}`.padStart(2, "0");
    let minutes = `${date.getMinutes()}`.padStart(2, "0");
    let seconds = `${date.getSeconds()}`.padStart(2, "0");

    return (`${hour}:${minutes}:${seconds}`);
  };

  const getDate = (dateTime) => {
    
    let dateParse = Date.parse(dateTime);
    let date = new Date(dateParse);
  
    let year = date.getFullYear();
    let month = `${date.getMonth() +1}`.padStart(2, "0");
    let day = `${date.getDate()}`.padStart(2, "0");

    return (`${day}/${month}/${year}`);
  };

  const getDateForFront = (dateTime) => {
    
    let dateParse = Date.parse(dateTime);
    let date = new Date(dateParse);
  
    let year = date.getFullYear();
    let month = `${date.getMonth() +1}`.padStart(2, "0");
    let day = `${date.getDate()}`.padStart(2, "0");

    return (`${year}-${month}-${day}`);
  };

  // Api Request to get Schedules

  useEffect(() => {
    getQueryStatus();
  }, []);

  const getQueryStatus = () => {
    SurveyService.getSurveysFromPatient(currentUser.id).then(
      (response) => {
        setSurveys(response.data);
      },
      (error) => {
          error.toString();
      }
    );
  }

  // Rendering Page and Modals
  return (
	  surveys ? (
  	<>
    <div className={"d-flex"} style={{justifyContent:'center', flex:1, height:"100%", paddingTop:"1rem"}}>
      <Container>
        <Row style={{display:'flex', justifyContent:'space-between', padding: "1rem 0px"}}>
          <h2 className={"titleContainer"} style={{width:"50%", paddingLeft: 0}}>
            Questionários
          </h2>
          <h2 onClick={() => handleInsertShow(surveys.surveyQuestions)} className={"titleContainerAction"} style={{width:"50%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
            Responder Questionário
          </h2>
        </Row>
        <Row>
        <Table striped hover>
          <thead>
            <tr>
			  <th>#</th>
              <th>Nome</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {surveys ? surveys.surveyAnswers.map((item, index) => {
              return(
                <tr key={item.idSurveyAnswer} >
				  <td style={{ verticalAlign: "baseline"}}>{index + 1}</td>
                  <td style={{ verticalAlign: "baseline"}}>{item.surveyName}</td>
                  <td style={{ verticalAlign: "baseline"}}>{getDate(item.dateAnswered)}</td>
                  <td style={{ verticalAlign: "baseline"}}>{getHour(item.dateAnswered)}</td>
                  <td style={{ verticalAlign: "baseline"}}>{item.totalPoints}</td>
                  <td style={{display:"flex", gap:"1rem"}}>
                    <button  className="btn btn-primary btn-block" onClick={() => handleShowMedicalRecord(surveys.surveyQuestions, item)}>
                      <span>Visualizar</span>
                    </button>
                    {/* <button className="btn btn-primary btn-block" onClick={() => handleShowEdit(item.idConsulta, getDateForFront(item.dataConsulta), getHour(item.dataConsulta), item.notesConsulta, item.statusConsulta)} >
                      <span>Editar</span>
                    </button>                  
                    <button className="btn btn-primary btn-block" onClick={() => handleShowDelete(getDate(item.dataConsulta), getHour(item.dataConsulta), (item.firstName + " " + item.lastName), item.contatoPaciente, item.notesConsulta || "", item.idConsulta)} >
                      <span>Excluir</span>
                    </button> */}
                  </td>
                </tr>
              );
            }) : null }
          </tbody>
          </Table>
        </Row>
      </Container>
    </div>
    
    {showMedicalRecord.show &&
      <MedicalRecordModal
        show={showMedicalRecord.show}
        infos={showMedicalRecord}
        onConfirm={() => handleCloseMedicalRecord(false)}
        onCancel={() => handleCloseMedicalRecord(false)}
      />
    }

    { showInsert.show && <NewAppointmentModal
      show={showInsert.show}
      infos={showInsert}
      onConfirm={handleInsertSubmit}
      onCancel={() => handleInsertClose(false)}
    />
	}

    { showEdit.show &&  
    <EditAppointmentModal
      show={showEdit.show}
      infos={showEdit}
      onConfirm={handleSubmitEdit}
      onCancel={() => handleCloseEdit(false)}
    />
    }

    <DeleteModal
      show={showDelete.show}
      infos={showDelete}
      onConfirm={handleSubmitDelete}
      onCancel={() => handleCloseDelete(false)}
    />
  </>) : null
  );   
};

export default PatientSurveysPatient;
