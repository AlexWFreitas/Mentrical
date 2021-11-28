-- Roles
-- 1 - Patient
-- 2 - Doctor
INSERT INTO roles(name) VALUES('ROLE_PATIENT');
INSERT INTO roles(name) VALUES('ROLE_DOCTOR');

-- Users
-- 1 - medico1 - pw: 123456 [ encrypted ]
-- 2 - paciente1 - pw: 123456  [ encrypted ]
INSERT INTO users(email, first_name, last_name, username, password, contact_number, identification_info )
VALUES 		('diegodisser@gmail.com', 'Diego', 'Disser', 'medico1', '$2a$10$R3Lll.dqNJ.fV1mIPpqaGe1zChjr5w1AizGccDCn8yvwN5GuiOQIC', '+55(11)3344-2221', '3712'),			
			('alex@gmail.com', 'Alex', 'Wong', 'paciente1', '$2a$10$R3Lll.dqNJ.fV1mIPpqaGe1zChjr5w1AizGccDCn8yvwN5GuiOQIC', '+55(11)3344-2221', '134.321.234-22'),
			('carlos@gmail.com', 'Carlos', 'Alves',  'paciente2', '$2a$10$R3Lll.dqNJ.fV1mIPpqaGe1zChjr5w1AizGccDCn8yvwN5GuiOQIC', '+55(11)3322-1145', '235.213.122-34'),
			('maryann@gmail.com', 'Mary', 'Ann', 'medico2', '$2a$10$R3Lll.dqNJ.fV1mIPpqaGe1zChjr5w1AizGccDCn8yvwN5GuiOQIC', '+55(11)3211-2311', '3722'),	
			('stevejobs@gmail.com', 'Steve', 'Johnson', 'paciente3', '$2a$10$R3Lll.dqNJ.fV1mIPpqaGe1zChjr5w1AizGccDCn8yvwN5GuiOQIC', '+55(11)3211-2311', '112.231.123-23');

-- Alex - Roles: Doctor
-- Carlos - Roles: Patient
INSERT INTO user_roles(user_id, role_id)
VALUES 		(1, 2), (2, 1), (3, 1), (4, 2), (5, 1);

-- DoctorPatient
INSERT INTO user_treatment(doctor_id, patient_id)
VALUES 		(1, 2), 
			(1, 3), 
			(4, 5);

-- Reports
INSERT INTO Reports(Create_Date, Mood, SYMPTOM_LIST, Report_Message, Report_Title, User_Id)
VALUES		('2021-09-14 23:59:59', 'Apático', 'Felicidade, Alegria, Paixão, Normalidade', 'Há mais de um mês atrás, a última vez que socializamos antes da quarentena, foi um domingo com cara de fim de mundo mesmo. Aniversário de uma amiga querida cancelado, muita comida de sobra e fomos lá pra casa de um casal amigo encher o bucho - deu preguiça de cozinhar esse dia, então até que caiu bem. Bem pouca gente, sem abraços, mas ainda cometendo algumas gafes higiênicas - ainda não estávamos acostumados. Apesar das restrições e incertezas, foi um dia cheio de calor, conforto e de certa forma nos preparou para o que estava por vir.', 'Quarentena', 2),
			('2021-10-16 12:34:11', 'Ansiedade', 'Stress, Anxiedade, Ódio, Pressa', 'Tenho 36 anos, sou casado, já tenho 2 filhos. Já trabalho, tenho casa, carro e mesmo assim, quando me olho no espelho ainda me vejo como um molecão. Quando estou em alguma festa ou qualquer reunião social sempre vejo outras pessoas da minha idade como sendo super adultas, como os adultos que eu costumava observar quando era criança, mas por algum motivo parece que eu não consigo me encaixar com eles. Até mesmo quando tento me enturmar parece que nenhum assunto me faz ficar confortável em conversar com eles. Talvez porque eu nunca me interessei muito por futebol, carros ou cerveja e as vezes parece que esses são os únicos assuntos que rolam. Esse final de semana fui na festa de aniversário de uma amiguinha do meu filho e conheci outros 3 pais, e até ficamos conversando um pouco, mas aquilo parecia tão forçado pra mim. Nem sei que idade eles tinham, acredito que não devessem ser muito mais velhos nem mais novos do que eu, mas quando olhava pra eles em seus sapatos, golas polo e relógio eu me sentia uma criança entre adultos.', 'Reflexoes sobre a vida adulta', 2),
			('2021-11-15 11:12:44', 'Triste', '', 'Eu namoro a 4 anos e recentemente eu noivei, fizemos um ensaio de foto e tals. Porém eu sou muito na minha, tenho redes sociais, mas não gosto de postar nada, nem foto minha. E ela tava desabafando/brigando CMG pq eu não postei nada sobre o noivado e ela diz que acha que eu tenho vergonha dela, só que não é verdade, eu só não gosto de postar nada da minha vida, inclusive quando estamos juntos é perfeito. Não gosto de postar nada pois valorizo a vida real, pra mim importa estar perto, não postar. Tenho certeza que meu relacionamento é melhor que muitos desses que postam, pra mim é só um status. E eu não gosto disso E ela diz estar triste pq vê um monte de casal que posta e tals, e que não se sente bem em não me ver postando nada. Eu estou errado? Eu deveria postar algo? Eu sou anormal por não querer postar nada?', 'Não gosto de postar nas redes sociais', 2),			
			('2021-11-19 20:30:11', 'Nervoso', '', 'Eu sou um trouxa mesmo. Eu queria comprar o minecraft e fui no site minecraft.com.br pq o jogo tava mais barato e quis comprar a versão full de 90 reais no boleto, passa-se um tempo e eu recebo o email da compra me dando um login de uma conta original de um cara aleatório, só que pra eu entrar nessa conta eu preciso responder as perguntas de segurança, o que eu não consigo pq eu não sou o proprietário daquela conta. Resumo da ópera, eu sou um trouxa que gastei 90 reais no golpe do minecraft, e o PIOR era que isso era o meu presente de aniversário, pelo menos eu deixei alguém nesse mundo feliz, no caso um golpista que deve amar nem a própria mãe.', 'Cai em um golpe na internet hoje', 2),
			('2021-11-15 11:12:44', 'Triste', '', 'Eu namoro xa 4 anos e recentemente eu noivei, fizemos um ensaio de foto e tals. Porém eu sou muito na minha, tenho redes sociais, mas não gosto de postar nada, nem foto minha. E ela tava desabafando/brigando CMG pq eu não postei nada sobre o noivado e ela diz que acha que eu tenho vergonha dela, só que não é verdade, eu só não gosto de postar nada da minha vida, inclusive quando estamos juntos é perfeito. Não gosto de postar nada pois valorizo a vida real, pra mim importa estar perto, não postar. Tenho certeza que meu relacionamento é melhor que muitos desses que postam, pra mim é só um status. E eu não gosto disso E ela diz estar triste pq vê um monte de casal que posta e tals, e que não se sente bem em não me ver postando nada. Eu estou errado? Eu deveria postar algo? Eu sou anormal por não querer postar nada?', 'Eu odeio ter que fazer exercícios', 3),			
			('2021-11-19 20:30:11', 'Tranquilo', '', 'Eu sou um trouxa mesmo. Eu queria comprar o minecraft e fui no site minecraft.com.br pq o jogo tava mais barato e quis comprar a versão full de 90 reais no boleto, passa-se um tempo e eu recebo o email da compra me dando um login de uma conta original de um cara aleatório, só que pra eu entrar nessa conta eu preciso responder as perguntas de segurança, o que eu não consigo pq eu não sou o proprietário daquela conta. Resumo da ópera, eu sou um trouxa que gastei 90 reais no golpe do minecraft, e o PIOR era que isso era o meu presente de aniversário, pelo menos eu deixei alguém nesse mundo feliz, no caso um golpista que deve amar nem a própria mãe.', 'Briguei com meu pai hoje', 3);

-- Consultas
INSERT INTO Appointments(Doctor_Patient_Pair_Id, Appointment_Date, Appointment_Annotation, status)
VALUES 		('1', '2021-11-19 20:30:00', 'Paciente parecia estar com desequilibrio emocional a morte de um parente.', 1),
			('2', '2021-09-15 20:30:00', 'Consulta muito produtiva, foi possível entender os problemas do paciente relacionados a relação com o pai.', 1),
			('1', '2021-10-16 21:00:00', 'Paciente cancelou devido a um imprevisto.', -1),
			('1', '2021-10-22 20:30:00', 'Paciente não compareceu.', -1),
			('1', '2021-12-16 21:00:00', 'Paciente aparenta estar com depressão recorrente.', 0),
			('1', '2021-12-22 20:30:00', 'Paciente estava inquieto devido a ter visto um acidente durante o uso de transporte público.', 0),
			('2', '2021-12-17 21:00:00', '', 0),
			('2', '2021-12-23 20:30:00', '', 0),
			('3', '2021-12-20 21:00:00', '', 0),
			('3', '2021-12-24 20:30:00', '', 0);	


-- Surveys
INSERT INTO Surveys(name, type)
VALUES		('Escala de Depressão de Beck', 'RADIOWEIGHT'),
			('Questionário Emocional', 'POINTS');

-- Questões [Id 1-21]
INSERT INTO Question(question)
VALUES		('Você se sente triste?'), --1
			('Você se sente desanimado quanto ao futuro?'), --2
			('Você sente que é um fracasso?'), --3
			('Você ainda sente prazer na mesma intensidade que em tempos passados?'), --4
			('Você se sente culpado?'), --5
			('Você acha que está sendo punido?'), --6
			('Você se sente decepcionado com você mesmo?'), --7
			('Você se culpa por seus erros?'), --8
			('Você pensa em se matar?'), --9
			('Você tem chorado mais do que no passado?'); --10


-- Survey Questions 1-21
INSERT INTO survey_questions(question_id, survey_id)
VALUES		(1, 1),
			(2, 1),
			(3, 1),
			(4, 1),
			(5, 1),
			(6, 1),
			(7, 1),
			(8, 1),
			(9, 1),
			(10, 1);

--	public Answer(String value, Integer points) {
--		this.value = value;
--		this.points = points;
--	}

-- Survey Answers			
INSERT INTO Answer(value, points, question_id)
VALUES		('Não me sinto triste.', 0, 1), --1
			('Eu me sinto triste.', 1, 1),
			('Estou sempre triste e não consigo sair disto.', 2, 1),
			('Estou tão triste ou infeliz que não consigo suportar.', 3, 1), --4
			('Não estou especialmente desanimado quanto ao futuro.', 0, 2), --5
			('Eu me sinto desanimado quanto ao futuro', 1, 2),
			('Acho que nada tenho a esperar', 2, 2),
			('Acho o futuro sem esperanças e tenho a impressão de que as coisas não podem melhorar.', 3, 2), --8
			('Não me sinto um fracasso', 0, 3), --9
			('Acho que fracassei mais do que uma pessoa comum.', 1, 3),
			('Quando olho pra trás, na miha vida, tudo o que posso ver é um monte de fracassos.', 2, 3),
			('Acho que, como pessoa, sou um completo fracasso', 3, 3), --12
			('Tenho tanto prazer em tudo como antes.', 0, 4), --13
			('Não sinto mais prazer nas coisas como antes.', 1, 4),
			('Não encontro um prazer real em mais nada.', 2, 4),
			('Estou insatisfeito ou aborrecido com tudo.', 3, 4), --16
			('Não me sinto especialmente culpado.', 0, 5), --17
			('Eu me sinto culpado grande parte do tempo.', 1, 5),
			('Eu me sinto culpado na maior parte do tempo.', 2, 5),
			('Eu me sinto sempre culpado.', 3, 5), -- 20
			('Não acho que esteja sendo punido.', 0, 6), --21
			('Acho que posso ser punido.', 1, 6),
			('Creio que vou ser punido.', 2, 6),
			('Acho que estou sendo punido.', 3, 6), --24
			('Não me sinto decepcionado comigo mesmo..', 0, 7), --25
			('Estou decepcionado comigo mesmo.', 1, 7),
			('Estou enojado de mim.', 2, 7),
			('Eu me odeio.', 3, 7), --28
			('Não me sinto de qualquer modo pior que os outros.', 0, 8), --29
			('Sou crítico em relação a mim por minhas fraquezas ou erros.', 1, 8),
			('Eu me culpo sempre por minhas falhas.', 2, 8),
			('Eu me culpo por tudo de mal que acontece.', 3, 8), --32
			('Não tenho quaisquer idéias de me matar.', 0, 9), --33
			('Tenho idéias de me matar, mas não as executaria.', 1, 9),
			('Gostaria de me matar.', 2, 9),
			('Eu me mataria se tivesse oportunidade.', 3, 9), --36
			('Não choro mais que o habitual.', 0, 10), --37
			('Choro mais agora do que costumava.', 1, 10),
			('Agora, choro o tempo todo.', 2, 10),
			('Costumava ser capaz de chorar, mas agora não consigo, mesmo que o queira.', 3, 10); --40
			
-- Assign Survey to Alex's Treatment
INSERT INTO Treatment_Survey(User_Treatment_Id, Survey_Id, Active)
VALUES		(1, 1, 1);

-- Answer a Survey as a Patient
INSERT INTO Survey_Response(TREATED_USER_ID, Survey_Id, Date_Answered)
VALUES		(1, 1, ('2021-09-17 11:00:00')),
			(1, 1, ('2021-10-18 11:00:00')),
			(1, 1, ('2021-11-19 11:00:00'));


-- Survey Answers
INSERT INTO Survey_User_Answer(Survey_Response_Id, Question_Id, Chosen_Answer_Id)
VALUES 		(1, 1, 1),
			(1, 2, 6),
			(1, 3, 11),
			(1, 4, 16),
			(1, 5, 17),
			(1, 6, 22),
			(1, 7, 27),
			(1, 8, 32),
			(1, 9, 33),
			(1, 10, 38);


INSERT INTO Survey_User_Answer(Survey_Response_Id, Question_Id, Chosen_Answer_Id)
VALUES 		(2, 1, 2),
			(2, 2, 7),
			(2, 3, 12),
			(2, 4, 13),
			(2, 5, 18),
			(2, 6, 23),
			(2, 7, 28),
			(2, 8, 29),
			(2, 9, 34),
			(2, 10, 39);

INSERT INTO Survey_User_Answer(Survey_Response_Id, Question_Id, Chosen_Answer_Id)
VALUES 		(3, 1, 3),
			(3, 2, 8),
			(3, 3, 9),
			(3, 4, 14),
			(3, 5, 19),
			(3, 6, 24),
			(3, 7, 25),
			(3, 8, 30),
			(3, 9, 35),
			(3, 10, 40);