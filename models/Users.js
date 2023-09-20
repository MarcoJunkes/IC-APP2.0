const Sequelize = require("sequelize");

class Users extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                email: {
                    primaryKey: true,
                    type: Sequelize.STRING
                },
                nome: Sequelize.STRING,
                telefone: Sequelize.INTEGER,
                senha: Sequelize.INTEGER,
                nome_responsavel: Sequelize.STRING,
                contato_responsavel: Sequelize.INTEGER,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            },
            {
                sequelize, 
            },
        );
    }
    static associate(models){
        this.hasMany(models.Medicamentos,  {
            foreignKey: "userEmail"
        });
    }
}
module.exports = Users;