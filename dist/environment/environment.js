"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.CONFIG = {
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
        TIME_FOR_REFRESH_EQUIPMENTS: (_a = process.env.TIME_FOR_REFRESH_EQUIPMENTS) !== null && _a !== void 0 ? _a : '*/30 * * * * *',
        TIME_FOR_REFRESH_POLYGONS: (_b = process.env.TIME_FOR_REFRESH_POLYGONS) !== null && _b !== void 0 ? _b : '*/30 * * * * *',
        TIME_FOR_REFRESH_MESH: (_c = process.env.TIME_FOR_REFRESH_MESH) !== null && _c !== void 0 ? _c : '*/30 * * * * *',
        TIME_FOR_REFRESH_DIG_LINE: (_d = process.env.TIME_FOR_REFRESH_DIG_LINE) !== null && _d !== void 0 ? _d : '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_STATE: (_e = process.env.TIME_FOR_REFRESH_DRILL_STATE) !== null && _e !== void 0 ? _e : '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_PRECISION: (_f = process.env.TIME_FOR_REFRESH_DRILL_PRECISION) !== null && _f !== void 0 ? _f : '*/30 * * * * *',
        TIME_FOR_REFRESH_DRILL_PITCH_ROLL: (_g = process.env.TIME_FOR_REFRESH_DRILL_PITCH_ROLL) !== null && _g !== void 0 ? _g : '*/30 * * * * *',
    }
};
