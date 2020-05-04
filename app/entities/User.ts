import { Model, DataTypes } from 'sequelize';
import sequelize from '../databases/sequelize.connections';

class User extends Model {

    public id!: number;
    public usuario!: string;
    public contrasena!: string;
    public idioma!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    usuario: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    contrasena: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    idioma: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    schema: 'public',
    tableName: "tp_usuarios",
    timestamps: false,
    sequelize: sequelize
});

export default User;