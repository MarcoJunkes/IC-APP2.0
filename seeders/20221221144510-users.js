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
          telefone: 12345,
          senha: "123abcde!",
          nome_responsavel: "Maria",
          contato_responsavel: 12345,
        },
        {
          email: "pedro@gmail.com",
          nome: "Pedro Henrique",
          telefone: 56321,
          senha: "123abcde!",
          nome_responsavel: "João",
          contato_responsavel: 12345,
        },
        {
          email: "paula@gmail.com",
          nome: "Pedro Henrique",
          telefone: 56321,
          senha: "123abcde!",
          nome_responsavel: "João",
          contato_responsavel: 12345,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
