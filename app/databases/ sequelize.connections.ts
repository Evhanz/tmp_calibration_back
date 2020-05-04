import { CONFIG } from '../environment/environment';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    CONFIG.CONTROL_DB.NAME_DB!,
    CONFIG.CONTROL_DB.USER_DB!,
    CONFIG.CONTROL_DB.PASS_DB,
    {
        host: CONFIG.CONTROL_DB.HOST_DB,
        dialect: 'postgres'
    }
);

export default sequelize;