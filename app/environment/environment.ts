
import * as dotenv from "dotenv";

dotenv.config();

export const CONFIG = {

    SERVER: {
        SERVER_URL: process.env.SERVER_URL,
        SERVER_PORT: Number(process.env.EXPRESS_PORT),
    },

    CONTROL_DB: {
        HOST_DB: process.env.HOST_DATA_BASE,
        USER_DB: process.env.USER_DATA_BASE,
        PASS_DB: process.env.PASS_DATA_BASE,
        NAME_DB: process.env.NAME_DATA_BASE,
        PORT_DB: Number(process.env.PORT_DATA_BASE),
    },

    MAP_CONFIG: {
        UTM_ZONE_NUMBER: Number(process.env.UTM_ZONE_NUMBER),
        UTM_ZONE_LETTER: process.env.UTM_ZONE_LETTER

    },

    REFRESH_CRON: {
        TIME_FOR_REFRESH_EQUIPMENTS: process.env.TIME_FOR_REFRESH_EQUIPMENTS ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_POLYGONS: process.env.TIME_FOR_REFRESH_POLYGONS ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_MESH:process.env.TIME_FOR_REFRESH_MESH ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_DIG_LINE : process.env.TIME_FOR_REFRESH_DIG_LINE ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_STATE:process.env.TIME_FOR_REFRESH_DRILL_STATE ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_PRECISION:process.env.TIME_FOR_REFRESH_DRILL_PRECISION ?? '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_PITCH_ROLL:process.env.TIME_FOR_REFRESH_DRILL_PITCH_ROLL ?? '*/30 * * * * *',
    }
}

