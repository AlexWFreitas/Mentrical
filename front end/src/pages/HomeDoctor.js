import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import DeleteModal from "../components/Modal/DeleteModal";
import ConsultaService from "../services/consulta.service";


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
            {props.infos.name}
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <div>
              <Form.Label>Data</Form.Label>
              <Form.Control type="text" placeholder="Data Da Consulta" value={props.infos.date} readOnly />
            </div>
            <div>
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" step="1" placeholder="Hora da Consulta" value={props.infos.time} readOnly />
            </div>
            <div style={{flex:1}}>
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" placeholder="Contato" value={props.infos.col} readOnly /> 
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Anotações</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder={"Anotações"} value={props.infos.annotations} readOnly /> 
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
          <option value="1">Concluída</option>
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
const HomeDoctor = () => {

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
  const handleShowMedicalRecord = (date, time, name, col, annotations) => setShowMedicalRecord({show:true, date, time, name, col, annotations});

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
    ConsultaService.getConsultasFromDoctor(currentUser.id).then(
      (response) => {
        setConsultas(response.data);
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
          <h2 className={"titleContainer"} style={{width:"50%", paddingLeft: 0}}>
            Consultas
          </h2>
          <h2 onClick={() => handleInsertShow(consultas)} className={"titleContainerAction"} style={{width:"50%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
            Inserir Consulta
          </h2>
        </Row>
        <Row>
        <Table striped hover>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((item) => {
              return(
                <tr key={item.idConsulta} >
                  <td style={{ verticalAlign: "baseline"}}>{getDate(item.dataConsulta)}</td>
                  <td style={{ verticalAlign: "baseline"}}>{getHour(item.dataConsulta)}</td>
                  <td style={{ verticalAlign: "baseline"}}>{item.firstName + " " + item.lastName}</td>
                  <td style={{ verticalAlign: "baseline"}}>{
                  item.statusConsulta == 0 ? "Agendada" : item.statusConsulta == 1 ? "Concluída" : "Cancelada"
                  }</td>
                  <td style={{display:"flex", gap:"1rem"}}>
                    <button  className="btn btn-primary btn-block" onClick={() => handleShowMedicalRecord(getDate(item.dataConsulta), getHour(item.dataConsulta), (item.firstName + " " + item.lastName), item.contatoPaciente, item.notesConsulta)}>
                      <span>Prontuário</span>
                    </button>
                    <button className="btn btn-primary btn-block" onClick={() => handleShowEdit(item.idConsulta, getDateForFront(item.dataConsulta), getHour(item.dataConsulta), item.notesConsulta, item.statusConsulta)} >
                      <span>Editar</span>
                    </button>                  
                    <button className="btn btn-primary btn-block" onClick={() => handleShowDelete(getDate(item.dataConsulta), getHour(item.dataConsulta), (item.firstName + " " + item.lastName), item.contatoPaciente, item.notesConsulta || "", item.idConsulta)} >
                      <span>Excluir</span>
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

export default HomeDoctor;
