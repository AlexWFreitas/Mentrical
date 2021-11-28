import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DeleteModal from "../../components/Modal/DeleteModal";
import ConsultaService from "../../services/consulta.service";
import DoctorService from "../../services/doctor.service";
import ReportService from "../../services/report.service";

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
              <Form.Control type="text" placeholder="Nome do Paciente" value={props.infos.fullName} readOnly />
            </div>
            <div>
              <Form.Label>Data de Registro</Form.Label>
              <Form.Control type="text" placeholder="Data do relato" value={props.infos.createdDate} readOnly />
            </div>
            <div>
              <Form.Label>Humor</Form.Label>
              <Form.Control type="titextme" placeholder="Humor do Dia" value={props.infos.mood} readOnly />
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
  const [titleSelected, setTitleSelected] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [contentSelected, setContentSelected] = useState();
  const [moodSelected, setMoodSelected] = useState();

  const onChangeTitle = (x) => {
    setTitleSelected(x.target.value);
  }

  const onChangeDate = (x) => {
    setDateSelected(x.target.value);
  }

  const onChangeContent = (x) => {
    setContentSelected(x.target.value);
  }

  const onChangeMood = (x) => {
    setMoodSelected(x.target.value);
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
            Criando Relato
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
            <div>
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Título" value={titleSelected} onChange={onChangeTitle} />
            </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Conteúdo</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder={"Relato do diário"} value={contentSelected} onChange={onChangeContent} /> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <div>
              <Form.Label>Criador</Form.Label>
              <Form.Control type="text" placeholder="Nome do Paciente" value={props.infos.fullName} readOnly />
            </div>
            <div>
              <Form.Label>Humor</Form.Label>
              <Form.Select aria-label="Default select example" placeholder="Paciente" value={moodSelected} onChange={onChangeMood}>
                <option value="-1">Clique para selecionar</option>
                <option value="Ansioso">Ansioso</option>
                <option value="Apático">Apático</option>
                <option value="Cansado">Cansado</option>
                <option value="Depressivo">Depressivo</option>
                <option value="Desesperado">Desesperado</option>
                <option value="Entediado">Entediado</option>
                <option value="Energizado">Energizado</option>
                <option value="Estressado">Estressado</option>
                <option value="Feliz">Feliz</option>
                <option value="Irritado">Irritado</option>
                <option value="Nervoso">Nervoso</option>
                <option value="Triste">Triste</option>
                <option value="Tranquilo">Tranquilo</option>
                <option value="Sofrimento">Sofrimento</option>
              </Form.Select>
            </div>
          </div>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(titleSelected, contentSelected, moodSelected)} disabled={dateSelected === "" || titleSelected === "" || contentSelected === "" || moodSelected === "" || moodSelected === "-1"}>Inserir</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditAppointmentModal(props) {
  const [titleSelected, setTitleSelected] = useState(props.infos.reportTitle);
  const [dateSelected, setDateSelected] = useState(props.infos.createdDate);
  const [contentSelected, setContentSelected] = useState(props.infos.reportMessage);
  const [moodSelected, setMoodSelected] = useState(props.infos.mood);

  const onChangeTitle = (x) => {
    setTitleSelected(x.target.value);
  }

  const onChangeDate = (x) => {
    setDateSelected(x.target.value);
  }

  const onChangeContent = (x) => {
    setContentSelected(x.target.value);
  }

  const onChangeMood = (x) => {
    setMoodSelected(x.target.value);
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
            Editando Relato
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
            <div>
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Título" value={titleSelected} onChange={onChangeTitle} />
            </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Conteúdo</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder={"Relato do diário"} value={contentSelected} onChange={onChangeContent} /> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <div>
              <Form.Label>Criador</Form.Label>
              <Form.Control type="text" placeholder="Nome do Paciente" value={props.infos.fullName} readOnly />
            </div>
            <div>
              <Form.Label>Humor</Form.Label>
              <Form.Select aria-label="Default select example" placeholder="Paciente" value={moodSelected} onChange={onChangeMood}>
                <option value="-1">Clique para selecionar</option>
                <option value="Ansioso">Ansioso</option>
                <option value="Apático">Apático</option>
                <option value="Cansado">Cansado</option>
                <option value="Depressivo">Depressivo</option>
                <option value="Desesperado">Desesperado</option>
                <option value="Entediado">Entediado</option>
                <option value="Energizado">Energizado</option>
                <option value="Estressado">Estressado</option>
                <option value="Feliz">Feliz</option>
                <option value="Irritado">Irritado</option>
                <option value="Nervoso">Nervoso</option>
                <option value="Triste">Triste</option>
                <option value="Tranquilo">Tranquilo</option>
                <option value="Sofrimento">Sofrimento</option>
              </Form.Select>
            </div>
          </div>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(props.infos.id, titleSelected, contentSelected, moodSelected)} disabled={dateSelected === "" || titleSelected === "" || contentSelected === "" || moodSelected === "" || moodSelected === "-1"}>Atualizar</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Main Component
const PatientJournalsPatient = () => {

  // Default Modal State
  const initialMedicalRecord = {show:false, name:"", date: "", time:"", col:"", annotations: "", idConsulta: 0};

  // Initializing State Holders for Each Modal
  const [showInsert, setShowInsert] = useState(initialMedicalRecord);
  const [showMedicalRecord, setShowMedicalRecord] = useState(initialMedicalRecord);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(initialMedicalRecord);

  // Insert Modal Logic
  const handleInsertClose = () => setShowInsert(initialMedicalRecord);
  const handleInsertShow = (fullName) => { setShowInsert({show:true, fullName}); }
  const handleInsertSubmit = (reportTitle, reportMessage, mood) => {
    ReportService.postReport(currentUser.id, reportTitle, reportMessage, mood).then(() => 
    { 
      getQueryStatus();
      setShowInsert({initialMedicalRecord}); 
    });
  }

  // Update Modal Logic
  const handleCloseEdit = () => setShowEdit(initialMedicalRecord);
  const handleShowEdit = (id, reportTitle, reportMessage, mood, fullName ) => setShowEdit({ show:true, id, reportTitle, reportMessage, mood, fullName })
  const handleSubmitEdit = (id, reportTitle, reportMessage, mood) => {
    ReportService.updateReport(id, reportTitle, reportMessage, mood).then(() => 
    { 
      getQueryStatus();
      setShowEdit({initialMedicalRecord}); 
    });
  }
  
  // Delete Modal Logic
  const handleCloseDelete = () => setShowDelete(initialMedicalRecord);
  const handleShowDelete = (id) => setShowDelete({show: true, id});
  const handleSubmitDelete = (id) => {
    ReportService.deleteReport(id).then(() => 
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
    DoctorService.getJournalsFromPatient(currentUser.id).then(
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
			<h2 onClick={() => handleInsertShow(journals && journals.length > 0 ? journals[0].creator.fullName : { fullName: "hello" })} className={"titleContainerAction"} style={{width:"84%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
				Inserir Registro
			</h2>
      {/* <h2 className={"titleContainerAction"} style={{width:"84%", display:'flex', justifyContent:"flex-end", paddingRight:0, cursor:"pointer"}}>
				{ journals ? journals[0].creator.fullName : null }
			</h2> */}
        </Row>
        <Row>
			<div className="col-2"></div>
			<Table striped hover className="col">
			<thead>
				<tr>
				<th className="col-5">Título</th>
				<th className="col-3">Data de Criação</th>
				<th className="col-2">Humor</th>         
        <th className="col-2">Ações</th>
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
              
              <td style={{display:"flex", gap:"1rem"}}>
                <button className="btn btn-primary btn-block" onClick={() => handleShowEdit(item.id, item.reportTitle, item.reportMessage, item.mood, item.creator.fullName )} >
                  <span>Editar</span>
                </button>                  
                <button className="btn btn-primary btn-block" onClick={() => handleShowDelete(item.id)} >
                  <span>Excluir</span>
                </button>
              </td>
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

    { showInsert.show &&  
    <NewAppointmentModal
      show={showInsert.show}
      infos={showInsert}
      onConfirm={handleInsertSubmit}
      onCancel={() => handleInsertClose(false)}
    />}

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

export default PatientJournalsPatient;
