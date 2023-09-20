'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "lista_horario",
      [
        {
          dataIngeriu: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          dataIngeriu: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
          dataIngeriu: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      ],
      {}
    );
  },

  down:async (queryInterface, Sequelize) => {
    await queryInterface("lista_horario", null, {});
  }
};
