'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("medicamentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "Users", key: "email" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qtd_dose: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      uso_continuo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      periodo_dias: {
        type: Sequelize.INTEGER,
      },
      posologia: {
        type: Sequelize.INTEGER,
      },
      horario_inicio: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("medicamentos");
  }
}; 