const Sequelize = require("sequelize");
const dbConfig = require("./config.json")['development'];

const Users = require("../models/Users");
const Medicamentos = require("../models/Medicamentos");
const ListaHorario = require("../models/ListaHorario");
const ListaMedicamentos = require("../models/ListaMedicamentos");

const connection = new Sequelize(dbConfig);

//inicialize os modelos para o sequelize
Users.init(connection);
Medicamentos.init(connection);
ListaHorario.init(connection);
ListaMedicamentos.init(connection);

//define o relacionamento entre os modelos
Users.associate(connection.models);
Medicamentos.associate(connection.models);
ListaHorario.associate(connection.models);
ListaMedicamentos.associate(connection.models);

module.exports = connection; 