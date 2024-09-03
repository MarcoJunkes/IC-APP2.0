const Sequelize = require("sequelize");

class Medicamentos extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false
                },
                userEmail: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    onDelete: "RESTRICT",
                    onUpdate: "RESTRICT"
                },
                nome: Sequelize.STRING,
                qtd_dose: Sequelize.INTEGER,
                data_inicio: Sequelize.DATE,
                uso_continuo: Sequelize.BOOLEAN,
                periodo_dias: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                posologia: Sequelize.INTEGER,
                horario_inicio: Sequelize.STRING,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            },
            {
                sequelize,
                tableName: "medicamentos",
            }
        )
    };

    static associate(models) {
        this.hasMany(models.ListaMedicamentos, {
            foreignKey: "id"
        });

        this.belongsTo(models.Users, {
            foreignKey: "userEmail"
        });
    }
}
module.exports = Medicamentos;