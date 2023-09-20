'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lista_medicamentos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      horario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "lista_horario", key: "id" },
      },
      idMedicamentos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "medicamentos", key: "id" },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("lista_medicamentos");
  }
};
