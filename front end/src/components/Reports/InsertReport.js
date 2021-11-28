import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";

import EventBus from "../../common/EventBus";

import { register } from "../../actions/report";

const required = (value) => {
	if (!value) {
		return (
		<div className="alert alert-danger" role="alert">
			This field is required!
		</div>
		);
	}
};

const InsertReport = () => {
	
	const [content, setContent] = useState("");

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


	const form = useRef();
	const checkBtn = useRef();
	const [idUser, setIdUser] = useState(useSelector((state) => state.auth.user.id));
	const [location, setLocation] = useState("");
	const [title, setTitle] = useState("");
	const [reportContent, setReportContent] = useState("");
	const [successful, setSuccessful] = useState(false);

	const { message } = useSelector(state => state.message);
	const dispatch = useDispatch();

	const onChangeTitle = (e) => {
		const title = e.target.value;
		setTitle(title);
	};

	const onChangeReportContent = (e) => {
		const reportContent = e.target.value;
		setReportContent(reportContent);
	};

	const onChangeLocation = (e) => {
		const location = e.target.value;
		setLocation(location);
	}

	const handleRegister = (e) => {
		e.preventDefault();

		setSuccessful(false);

		form.current.validateAll();
		
		if (checkBtn.current.context._errors.length === 0) {
		dispatch(register(title, reportContent, location, idUser))
			.then(() => {
			setSuccessful(true);
			})
			.catch(() => {
			setSuccessful(false);
			});
		}
	};

	
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
		<div className="col-md-8 m-auto">
		<div className="card" >

			<Form onSubmit={handleRegister} ref={form}>
			{!successful && (
				<div>
					
				<div className="form-group">
					<label htmlFor="title">Título</label>
					<Input
					type="text"
					className="form-control"
					name="title"
					value={title}
					onChange={onChangeTitle}
					validations={[required]}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="reportContent">Conteúdo do Relato</label>
					<textarea
					type="text"
					className="form-control"
					name="reportContent"
					rows="5"
					value={reportContent}
					onChange={onChangeReportContent}
					validations={[required]}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="location">Localização</label>
					<textarea
					type="text"
					className="form-control"
					name="location"
					rows="3"
					value={location}
					onChange={onChangeLocation}
					validations={[required]}
					/>
				</div>


				<div className="form-group">
					<button className="btn btn-primary btn-block mt-2">Enviar</button>
				</div>
				</div>
			)}

			{message && (
				<div className="form-group">
				<div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
					{message}
				</div>
				</div>
			)}
			<CheckButton style={{ display: "none" }} ref={checkBtn} />
			</Form>
		</div>
		</div>
		
	);
};

export default InsertReport;
