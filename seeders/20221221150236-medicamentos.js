'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "medicamentos",
      [
        {
          userEmail: "carlos@gmail.com",
          nome: "Exemplo1",
          qtd_dose: 2,
          data_inicio: "2022-01-01",
          uso_continuo: false,
          periodo_dias: 20,
          posologia: 6,
          horario_inicio: "15:00"
        },
        {
          userEmail: "carlos@gmail.com",
          nome: "Exemplo2",
          qtd_dose: 2,
          data_inicio: "2023-02-01",
          uso_continuo: false,
          periodo_dias: 15,
          posologia: 12,
          horario_inicio: "23:00"
        },
        {
          userEmail: "paula@gmail.com",
          nome: "Exemplo3",
          qtd_dose: 2,
          data_inicio: "2022-11-09",
          uso_continuo: false,
          periodo_dias: 20,
          posologia: 12,
          horario_inicio: "09:00"
        },
        {
          userEmail: "pedro@gmail.com",
          nome: "exemplo4",
          qtd_dose: 2,
          data_inicio: "2022-12-01",
          uso_continuo: true,
          periodo_dias: null,
          posologia: 6,
          horario_inicio: "00:00"
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
