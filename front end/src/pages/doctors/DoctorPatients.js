import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
            Dados do Paciente
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
				<div style={{flex:2}}>
				<Form.Label>Nome</Form.Label>
				<Form.Control type="text" placeholder="Nome" value={props.infos.firstName} readOnly />
				</div>
				<div style={{flex:2}}>
				</div>
          </div>
        </Form.Group>
		<Form.Group className="mb-3" controlId="formBasicEmail">
			<div style={{display:"flex", gap: "1rem"}}>
				<div style={{flex:2}}>
				<Form.Label>Sobrenome</Form.Label>
				<Form.Control type="text" placeholder="Sobrenome" value={props.infos.lastName} readOnly />
				</div>
				<div style={{flex:2}}>
				</div>
			</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
			<div style={{flex:1}}>
				<Form.Label>Telefone</Form.Label>
				<Form.Control type="text" placeholder="Contato" value={props.infos.contactNumber} readOnly /> 
			</div>
			<div style={{flex:2}}>
				<Form.Label>Email</Form.Label>
				<Form.Control type="text" placeholder="Contato" value={props.infos.email} readOnly /> 
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
            <option>Open this select menu</option>
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
        <Button onClick={() => props.onConfirm(treatmentSelected, (dateSelected.toString() + "T" + timeSelected.toString()))} disabled={dateSelected==="" || timeSelected==="" || treatmentSelected===""}>Agendar</Button>
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
const DoctorPatients = () => {

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
  const handleShowMedicalRecord = (firstName, lastName, email, contactNumber) => setShowMedicalRecord({show:true, firstName, lastName, email, contactNumber});

  // Data States
  const { user: currentUser } = useSelector((state) => state.auth);
  const [consultas, setConsultas] = useState([]);

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
    DoctorService.getPatientsFromDoctor(currentUser.id).then(
      (response) => {
        setConsultas(response.data);
      },
      (error) => {
          error.toString();
      }
    );
  }

  // Handle Click to Route
  const history = useHistory();

  const HandleClickJournals = (id) => {
	  history.push(`/doctor/patients/${id}/journals`);
  }

  const handleClickSurveys = (id) => {
	  history.push(`/doctor/patients/${id}/surveys`);
  }

  const handleClickExperimental = (id) => {
    history.push(`/experimental`);
  }

  // Rendering Page and Modals
  return (
  <>
    <div className={"d-flex"} style={{justifyContent:'center', flex:1, height:"100%", paddingTop:"1rem"}}>
      <Container>
        <Row style={{display:'flex', justifyContent:'space-between', padding: "1rem 0px"}}>
          <h2 className={"titleContainer"} style={{width:"50%", paddingLeft: 0}}>
            Pacientes
          </h2>
          {/* <h2 onClick={() => handleInsertShow(consultas)} className={"titleContainerAction"} style={{width:"50%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
            Inserir Consulta
          </h2> */}
        </Row>
        <Row>
        <Table striped hover>
          <thead>
            <tr>
			  <th>#</th>
              <th>Nome</th>
              <th>Próxima Consulta</th>
			  <th>Status</th>
			  <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((item, index) => {
              return(
                <tr key={item.idConsulta} >
				  <td style={{ verticalAlign: "baseline"}}>{index+1}</td>
                  <td style={{ verticalAlign: "baseline"}}>{item.fullName}</td>
                  <td style={{ verticalAlign: "baseline"}}>{getDate(item.consultas[0].appointmentDate)} {getHour(item.consultas[0].appointmentDate)}</td>
                  <td style={{ verticalAlign: "baseline"}}>Ativo</td>
                  <td style={{display:"flex", gap:"1rem"}}>
                    <button  className="btn btn-primary btn-block" onClick={() => handleShowMedicalRecord(item.firstName, item.lastName, item.email, item.contactNumber)}>
                      <span>Detalhes</span>
                    </button>
                    <button className="btn btn-primary btn-block" onClick={() => HandleClickJournals(item.idPatient)} >
                      <span>Diários</span>
                    </button>                  
                    <button className="btn btn-primary btn-block" onClick={() => handleClickSurveys(item.idPatient)} >
                      <span>Questionários</span>
                    </button>
                    <button className="btn btn-primary btn-block" onClick={() => handleClickExperimental(item.idPatient)} >
                      <span>Experimental</span>
                    </button>
                  </td>
                </tr>
              );
            })}
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

export default DoctorPatients;
