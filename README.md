# Mentrical
Repositório do Projeto Mentrical

Mentrical é um aplicação web feita para ser usada por psicólogos, psiquiatras e seus pacientes para auxiliar no processo do tratamento.
Ele oferece ferramentas de gerenciamento de consultas, pacientes.
E fornece funcionalidades de gerenciamento de questionários e diários de pacientes que podem ser utilizadas pelos pacientes, mas também podem ser lidas e observadas pelos terapeutas.

O sistema foi dividido em duas partes:
Back end - Feito em Java com Spring Boot, Spring Data, Spring Security, Spring Web.
Front end - HTML + CSS + Javascript com React com Redux e Bootstrap.

O Front end e o Back end se comunicam através de APIs do tipo REST que são disponibilizadas pelo Back end.
O banco de dados configurado é um banco de dados em memória do tipo H2 Database que pode ser facilmente substituido por outros bancos de dados através de configurações do Spring Data.
Além disso os dados do sistema são inicializados na inicialização através de um script de inserção de dados chamado data.sql.
O sistema de autenticação é baseado no uso de Spring Security com tokens do tipo JWT para autenticação.

Usuários e senha padrão para teste do sistema:
paciente1 - 123456
medico1 - 123456
paciente2 -123456

O sistema é de código aberto e pode ser utilizado por outros para criar forks continuando o desenvolvimento.




