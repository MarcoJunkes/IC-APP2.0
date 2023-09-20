'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "lista_medicamentos",
      [
        {
          horario: 1,
          idMedicamentos: 1 
        },
        {
          horario: 2,
          idMedicamentos: 3
        },
        {
          horario: 1,
          idMedicamentos: 2
        },
      ],
      {}
    );
  },

  down:async (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete("lista_medicamentos", null, {});
  }
};
