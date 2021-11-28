import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DeleteModal from "../../components/Modal/DeleteModal";
import ConsultaService from "../../services/consulta.service";
import DoctorService from "../../services/doctor.service";



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
            {props.infos.reportTitle}
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Control as="textarea" rows={10} placeholder={"Relato do diário"} value={props.infos.reportMessage} readOnly /> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
          <div>
              <Form.Label>Criador</Form.Label>
              <Form.Control type="text" placeholder="Data Da Consulta" value={props.infos.fullName} readOnly />
            </div>
            <div>
              <Form.Label>Data de Criação</Form.Label>
              <Form.Control type="text" placeholder="Data Da Consulta" value={props.infos.createdDate} readOnly />
            </div>
            <div>
              <Form.Label>Humor</Form.Label>
              <Form.Control type="text" placeholder="Hora da Consulta" value={props.infos.mood} readOnly />
            </div>
          </div>
        </Form.Group>
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
    DoctorService.getJournalsFromPatient(currentUser.id).then(
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
            Inserir Consulta
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <Form.Control type="date" placeholder="Data Da Consulta" onChange={onChangeDate} />
            <Form.Control type="time" step="1" placeholder="Hora da Consulta" onChange={onChangeTime}/>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Select aria-label="Default select example" placeholder="Paciente"  onChange={onChangeTreatment}>
            <option value="-1">Clique para selecionar</option>
            {
              pacientes ? pacientes.map((item) => {
              return (
                <option key={item.idTreatment} value={item.idTreatment}>{item.firstName} {item.lastName}</option>
              ) 
            }) : null
            }
            
          </Form.Select>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(treatmentSelected, (dateSelected.toString() + "T" + timeSelected.toString()))} disabled={dateSelected==="" || timeSelected==="" || treatmentSelected==="" || treatmentSelected ==="-1" }>Agendar</Button>
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
        <Button onClick={() => props.onConfirm(props.infos.idConsulta, (dateSelected.toString() + " " + timeSelected.toString()), statusSelected)} disabled={dateSelected === "" || timeSelected === "" || statusSelected === ""}>Atualizar</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Main Component
const PatientJournalsDoctor = () => {

  // Default Modal State
  const initialMedicalRecord = {show:false, name:"", date: "", time:"", col:"", annotations: "", idConsulta: 0};

  // Initializing State Holders for Each Modal
  const [showInsert, setShowInsert] = useState(initialMedicalRecord);
  const [showMedicalRecord, setShowMedicalRecord] = useState(initialMedicalRecord);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(initialMedicalRecord);

  // Insert Modal Logic
  const handleInsertClose = () => setShowInsert(initialMedicalRecord);
  const handleInsertShow = (consultas) => 
  {
    setShowInsert({show:true, consultas});    
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
  const handleSubmitEdit = (idConsulta, dateTime, status) => {
    ConsultaService.updateSchedule(idConsulta, dateTime, status).then(() => 
    { 
      getQueryStatus();
      setShowEdit({initialMedicalRecord}); 
    });
  }
  
  // Delete Modal Logic
  const handleCloseDelete = () => setShowDelete(initialMedicalRecord);
  const handleShowDelete = (date, time, name, col, annotations, idConsulta) => setShowDelete({show: true, date, time, name, col, annotations, idConsulta});
  const handleSubmitDelete = (idConsulta) => {
    ConsultaService.deleteConsultaById(idConsulta).then(() => 
    { 
      getQueryStatus();
      setShowDelete({initialMedicalRecord}); 
    });
  }

  // Detailed View Modal Logic
  const handleCloseMedicalRecord = () => setShowMedicalRecord(initialMedicalRecord);
  const handleShowMedicalRecord = (reportTitle, reportMessage, mood, createdDate, fullName) => setShowMedicalRecord({show:true, reportTitle, reportMessage, mood, createdDate, fullName});

  // Data States
  const { user: currentUser } = useSelector((state) => state.auth);
  const [journals, setJournals] = useState([{creator: {fullName: ""}}]);

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

  const params = useParams();
  
  const getQueryStatus = () => {
    DoctorService.getJournalsFromPatient(params.id).then(
      (response) => {
        setJournals(response.data);
      },
      (error) => {
          error.toString();
      }
    );
  }

  // Rendering Page and Modals
  return (
  <>
    <div className={"d-flex"} style={{justifyContent:'center', flex:1, height:"100%", paddingTop:"1rem"}}>
      <Container>
        <Row style={{display:'flex', justifyContent:'space-between', padding: "1rem 0px"}}>
			<div className="col-1"></div>
			<h2 className={"titleContainer"} style={{width: "84%"}}>
				Diários Emocionais
			</h2>
			{/* <h2 onClick={() => handleInsertShow(journals)} className={"titleContainerAction"} style={{width:"84%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
				Inserir Registro
			</h2> */}
      <h2 className={"titleContainerAction"} style={{width:"84%", display:'flex', justifyContent:"flex-end", paddingRight:0}}>
				{ journals && journals.length > 0 ? journals[0].creator.fullName : null }
			</h2>
        </Row>
        <Row>
			<div className="col-2"></div>
			<Table striped hover className="col">
			<thead>
				<tr>
				<th className="col-6">Título</th>
				<th className="col-3">Data de Criação</th>
				<th className="col-3">Humor</th>         
				</tr>
			</thead>
			<tbody>
				{ 
          journals ? journals.map((item) => {
          return(
            <tr key={item.id} >
              <td style={{ verticalAlign: "baseline"}} onClick={() => handleShowMedicalRecord( item.reportTitle, item.reportMessage, item.mood, getDate(item.createDate) + " " + getHour(item.createDate), item.creator.fullName )}>{item.reportTitle}</td>
              <td style={{ verticalAlign: "baseline"}} onClick={() => handleShowMedicalRecord( item.reportTitle, item.reportMessage, item.mood, getDate(item.createDate) + " " + getHour(item.createDate), item.creator.fullName )}>{getDate(item.createDate)} {getHour(item.createDate)}</td>
              <td style={{ verticalAlign: "baseline"}} onClick={() => handleShowMedicalRecord( item.reportTitle, item.reportMessage, item.mood, getDate(item.createDate) + " " + getHour(item.createDate), item.creator.fullName )}>{item.mood}</td>
            </tr>
          );
          }) : null 
        }
			</tbody>
          </Table>
		  <div className="col-2"></div>
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

    <NewAppointmentModal
      show={showInsert.show}
      consultas={showInsert.consultas}
      onConfirm={handleInsertSubmit}
      onCancel={() => handleInsertClose(false)}
    />

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
  </>
  );   
};

export default PatientJournalsDoctor;
