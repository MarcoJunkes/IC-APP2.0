const Sequelize = require("sequelize");

class ListaHorario extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                dataIngeriu: Sequelize.DATE,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.ListaMedicamentos, {
            foreignKey: "id"
        });
    }
}

module.exports = ListaHorario;