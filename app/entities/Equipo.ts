import { Model, DataTypes } from 'sequelize';
import sequelize from '../databases/sequelize.connections';

class Equipo extends Model {

    public id!: number;
    public id_equipo!: number;
    public id_flota!: number;
    public nombre!: string;
}

Equipo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    id_equipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_flota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: "ts_equipos",
    timestamps: false,
    sequelize: sequelize
});

export default Equipo;