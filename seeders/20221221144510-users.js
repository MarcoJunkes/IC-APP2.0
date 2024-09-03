'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "carlos@gmail.com",
          nome: "Carlos Alberto",
          telefone: "46999353794",
          senha: "123abcde!",
          nome_responsavel: "Maria",
          contato_responsavel: "46999353794",
        },
        {
          email: "pedro@gmail.com",
          nome: "Pedro Henrique",
          telefone: "46999353794",
          senha: "123abcde!",
          nome_responsavel: "João",
          contato_responsavel: "46999353794",
        },
        {
          email: "paula@gmail.com",
          nome: "Pedro Henrique",
          telefone: "46999353794",
          senha: "123abcde!",
          nome_responsavel: "João",
          contato_responsavel: "46999353794",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
