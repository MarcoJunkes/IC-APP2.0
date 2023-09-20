const Sequelize = require("sequelize");

class ListaMedicamentos extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                horario: Sequelize.DATE,
                idMedicamentos: Sequelize.INTEGER,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Medicamentos, {
            foreignKey: "id"
        });
        this.belongsTo(models.ListaHorario, {
            foreignKey: "id"
        })
    }
}

module.exports = ListaMedicamentos;