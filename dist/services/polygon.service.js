"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decodeCoors_1 = __importDefault(require("../core/helpers/decodeCoors"));
const rgbToHex_1 = __importDefault(require("../core/helpers/rgbToHex"));
const geographicCoordinate_1 = __importDefault(require("../core/helpers/geographicCoordinate"));
function setPolygon(result) {
    let polyngs = [];
    for (let item of result) {
        let xcoor = decodeCoors_1.default(item.xcoorutf);
        let ycoor = decodeCoors_1.default(item.ycoorutf);
        let coors = [];
        for (let i = 0; i < xcoor.length; i++) {
            let coors_greografic = geographicCoordinate_1.default(Number(xcoor[i]), Number(ycoor[i]));
            let coor = [coors_greografic.latitude, coors_greografic.longitude];
            coors.push(coor);
        }
        let partName = item.nombre.split('-');
        let abrev = item.nombre;
        if (partName.length > 2) {
            abrev = `${partName[partName.length - 2]}-${partName[partName.length - 1]}`;
        }
        if (partName == 2) {
            abrev = partName[partName.length - 1];
        }
        polyngs.push({
            id: item.id,
            name: item.nombre,
            abrev,
            nivel: item.nivel,
            color: rgbToHex_1.default(item.rgb),
            coors: coors,
            actualmined: item.actualmined ? item.actualmined.toFixed(2) : 0,
            percentagemined: Number(((item.actualmined ? item.actualmined.toFixed(2) : 0) * 100) / item.total).toFixed(2),
        });
    }
    return polyngs;
}
exports.default = setPolygon;
