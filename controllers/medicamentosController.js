const Medicamentos = require("../models/Medicamentos");
const Users = require("../models/Users");
const Sequelize = require("sequelize");
const moment = require("moment");

module.exports = {
    async listAll(req, res) {
        try {
            const medicamentos = await Medicamentos.findAll({
                where: { userEmail: req.email },
                order: [["nome", "ASC"]],
                attributes: ["nome", "qtd_dose", "data_inicio", "uso_continuo", "periodo_dias", "posologia", "horario_inicio"]
            });

            const medicamentosFormatados = medicamentos.map((medicamento) => ({
                nome: medicamento.nome,
                qtd_dose: medicamento.qtd_dose,
                data_inicio: moment.utc(medicamento.data_inicio).format('DD/MM/YYYY'),
                uso_continuo: medicamento.uso_continuo,
                periodo_dias: medicamento.periodo_dias,
                posologia: medicamento.posologia,
                horario_inicio: medicamento.horario_inicio,
            }));

            if (!medicamentos || medicamentos.length === 0) {
                return res.status(404).json({ msg: "Não foi possível encontrar medicamentos! " });
            }
            res.status(200).json({ medicamentos: medicamentosFormatados });
        } catch (error) {
            res.status(500).json({ msg: "Falha na conexão", error });
        }
    },

    async newMedicine(req, res) {
        const userEmail = req.email;
    
        const {
            nome,
            qtd_dose,
            uso_continuo,
            posologia,
            horario_inicio
        } = req.body;
    
        const data_inicio = moment.utc(req.body.data_inicio, 'DD/MM/YYYY', true);
        let periodo_dias = req.body.periodo_dias;
    
        if (!userEmail || !nome || !qtd_dose || !data_inicio.isValid() || !uso_continuo || !posologia || !horario_inicio) {
            res.status(400).json({ msg: "Campos obrigatórios não preenchidos! " });
        }
    
        if (periodo_dias === "") periodo_dias = null;
    
        const emailUser = await Users.findOne({
            where: { email: userEmail },
        });
    
        const isMedicamentoNew = await Medicamentos.findOne({
            where: { userEmail, nome, qtd_dose, uso_continuo, posologia, periodo_dias, horario_inicio },
        });
        
        if (!emailUser)
            res.status(403).json({ msg: "Email não cadastrado! " });
        else {
            if (isMedicamentoNew)
                res.status(403).json({ msg: "Medicação já cadastrada." });
            else {
                const medicamento = await Medicamentos.create({
                    userEmail,
                    nome,
                    qtd_dose,
                    data_inicio,
                    uso_continuo,
                    periodo_dias,
                    posologia,
                    horario_inicio
                }).catch((error) => {
                    res.status(500).json({ msg: "Não foi possível inserir os dados!", error });
                });
                if (medicamento)
                    res.status(201).json({ msg: "Medicação cadastrado com sucesso! " });
                else
                    res.status(404).json({ msg: "Não foi possível fazer o cadastro da medicação." });
            }
        }
    },

    async deleteMedicine(req, res) {
        const idMedicine = req.params.id;
        const deleteMedicine = await Medicamentos.destroy({
            where: { id: idMedicine },
        });
        if (deleteMedicine)
            res.status(200).json({ msg: "Medicação Deletada" });
        else
            res.status(404).json({ msg: "Medicação não encontrada! " });
    },

    async updateMedicine(req, res) {
        const idMedicine = req.params.id;
        const medicamento = req.body;

        const updateMedicine = await Medicamentos.findOne({
            where: { id: idMedicine },
        });

        if (!updateMedicine)
            res.status(404).json({ msg: "Medicamento não encontrado! " });
        else {
            if (medicamento.nome || medicamento.qtd_dose || medicamento.data_inicio || medicamento.uso_continuo || medicamento.periodo_dias || medicamento.horario_inicio) {
                await Medicamentos.update(medicamento, {
                    where: { id: idMedicine },
                });
                return res.status(200).json({ msg: "Medicação Atualizada." });
            } else return res.status(400).json({ msg: "Dados não preenchidos! " });
        }
    },

    async listaMedicamentos(req, res) {
        const dataSelecionada = moment.utc(req.body.data_inicio, 'DD/MM/YYYY', true);
    
        if (!dataSelecionada.isValid()) {
            return res.status(400).json({ msg: "Campo obrigatório não preenchido ou preenchido incorretamente!" });
        }
    
        try {
            const medicamentos = await Medicamentos.findAll({
                attributes: ['nome', 'posologia', 'horario_inicio', 'periodo_dias', 'data_inicio'],
                where: { userEmail: req.email },
            });
    
            const horariosMedicamentos = [];
    
            medicamentos.forEach(medicamento => {
                const dataInicio = moment.utc(medicamento.data_inicio, 'DD/MM/YYYY');
                const horarioInicio = moment.utc(medicamento.horario_inicio, 'HH:mm');
                const posologia = medicamento.posologia;
                const periodo = medicamento.periodo_dias;
    
                let dataFim;
                if (periodo) {
                    dataFim = dataInicio.clone().add(periodo, 'days');
                }
    
                if (dataSelecionada.isBetween(dataInicio, dataFim || dataSelecionada, 'day', '[]')) {
                    const horario = dataInicio.clone().set({
                        hour: horarioInicio.hours(),
                        minute: horarioInicio.minutes()
                    });
    
                    while (horario.isSameOrBefore(dataFim || dataSelecionada, 'day')) {
                        if (horario.isSame(dataSelecionada, 'day')) {
                            horariosMedicamentos.push({
                                nome: medicamento.nome,
                                horario: horario.format('HH:mm'),
                            });
                        }
    
                        horario.add(posologia, 'hours');
                    }
                }
            });
    
            horariosMedicamentos.sort((a, b) => {
                const horaA = moment(a.horario, 'HH:mm');
                const horaB = moment(b.horario, 'HH:mm');
                return horaA - horaB;
            });
    
            if (horariosMedicamentos.length > 0) {
                return res.status(200).json({ horariosMedicamentos });
            } else {
                return res.status(404).json({ msg: "Sem medicamentos encontrados!" });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Falha na conexão", error });
        }
    }
    
}