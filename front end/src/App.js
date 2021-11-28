import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { REFRESH } from "./actions/types";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Home from "./components/Home";
import Profile from "./components/User/Profile";
import InsertReport from "./components/Reports/InsertReport";
import ReportDetails from "./components/Reports/ReportDetails";
import DoctorPatients from "./pages/doctors/DoctorPatients";
import HomeDoctor from "./pages/HomeDoctor";
import NotFound from "./pages/NotFound";
import PatientJournalsDoctor from "./pages/doctors/PatientJournalsDoctor";
import PatientJournalsPatient from "./pages/patients/PatientJournalsPatient";
import PatientSurveysPatient from "./pages/patients/PatientSurveysPatient";
import PatientSurveysDoctor from "./pages/doctors/PatientSurveysDoctor";
import ExperimentalPage from "./pages/experimental/ExperimentalPage";

import { logout, updateUser } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import auth from "./reducers/auth"

function EditUserModal(props) {
  const [nameSelected, setNameSelected] = useState(props.user.firstName);
  const [lastNameSelected, setLastNameSelected] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState(props.user.contactNumber);


  const onChangeName = (x) => {
    setNameSelected(x.target.value);
  }

  const onChangeLastName = (x) => {
    setLastNameSelected(x.target.value);
  }

  const onChangeEmail = (x) => {
    setEmail(x.target.value);
  }

  const onChangeTelephone = (x) => {
    setTelephone(x.target.value);
  }

  const onChangePassword = (x) => {
    setPassword(x.target.value);
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
            Editar Perfil
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="py-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" onChange={onChangeName} value={nameSelected} />
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control type="text" onChange={onChangeLastName} value={lastNameSelected} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{display:"flex", gap: "1rem"}}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" onChange={onChangeEmail} value={email} />
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" onChange={onChangeTelephone} value={telephone}/>
          </div>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(nameSelected, lastNameSelected, email, telephone)} disabled={nameSelected === "" || lastNameSelected === "" || telephone === "" || email === ""}>Atualizar</Button>
      </Modal.Footer>
    </Modal>
  );
}

const App = () => {
  const [showDoctorBoard, setShowDoctorBoard] = useState(false);
	const { message } = useSelector(state => state.message);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [showEdit, setShowEdit] = useState(false);
	const [successful, setSuccessful] = useState(false);

  const onChangeUserConfirm = (firstName, lastName, email, contactNumber) => {
    dispatch(updateUser(currentUser.id, firstName, lastName, email, contactNumber));
    handleCloseEdit();
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.email = email;
    currentUser.contactNumber = contactNumber;

    dispatch({
      type: REFRESH,
      payload: currentUser,
    });

    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowDoctorBoard(currentUser.roles.includes("ROLE_DOCTOR"));
    } else {
      setShowDoctorBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div className={"d-flex flex-column"} style={{height:"100%"}}>
        <nav className="navbar navbar-expand bg-primary navbar-dark fw-bold">
          <Link to={"/"} className="navbar-brand ms-2">
            Mentrical
          </Link>
          <div className="navbar-nav me-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {currentUser && showDoctorBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/doctor/appointments"} className="nav-link">
                    Consultas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/doctor/patients"} className="nav-link">
                    Pacientes
                  </Link>
                </li>
              </>
            )}

            {currentUser && !showDoctorBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/patient/journals"} className="nav-link">
                    Diários
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/patient/surveys"} className="nav-link">
                    Questionários
                  </Link>
                </li>
                
                {/* <li className="nav-item">
                  <Link to={"/reports/insert"} className="nav-link">
                    Inserir Relato
                  </Link>
                </li>
                 */}
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-link text-decoration-none fw-bold " style={{ color: "#ffffff8c" }}  onClick={handleShowEdit} >
                  <span>{currentUser.firstName + " " + currentUser.lastName}</span>
                </button>
                  
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className={"flex-grow-1 d-flex"}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/doctor/appointments" component={HomeDoctor} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/patient/journals" component={PatientJournalsPatient} />
            <Route exact path="/reports/insert" component={InsertReport} />
            <Route exact path="/reports/:id/" component={ReportDetails} />
            <Route exact path="/doctor/patients" component={DoctorPatients} />
            <Route exact path="/doctor/patients/:id/journals" component={PatientJournalsDoctor} />
            <Route exact path="/patient/surveys" component={PatientSurveysPatient} />
            <Route exact path="/doctor/patients/:id/surveys" component={PatientSurveysDoctor} />
            <Route exact path="/experimental" component={ExperimentalPage} />
            <Route component={NotFound}></Route>
          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>

      {currentUser && showEdit
      ? <EditUserModal
        show={showEdit}
        infos={showEdit}
        onConfirm={onChangeUserConfirm} 
        onCancel={() => handleCloseEdit(false)}
        user={currentUser}
        message={message}
        successful={successful}
      /> : <div> </div> }
      
    </Router>

  );
};

export default App;
