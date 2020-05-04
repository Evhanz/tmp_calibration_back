"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Decrypt {
    constructor() { }
    ord(value) {
        let str = value;
        let code = str.charCodeAt(0);
        if (code >= 0xD800 && code <= 0xDBFF) {
            let hi = code;
            if (str.length === 1)
                return code;
            let low = str.charCodeAt(1);
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (code >= 0xDC00 && code <= 0xDFFF)
            return code;
        return code;
    }
    nomascii(value) {
        let strTemp = "";
        for (let counter = 0; counter < value.length; counter++) {
            let chTemp = value[counter];
            if (chTemp != `.`) {
                let intTemp = this.ord(chTemp);
                if (intTemp <= 48) {
                    strTemp = `${strTemp}${intTemp - 9}`;
                }
                else if (intTemp <= 57) {
                    strTemp = `${strTemp}${intTemp - 8}`;
                }
                else if (intTemp <= 73) {
                    strTemp = `${strTemp}${intTemp - 54}`;
                }
                else if (intTemp <= 82) {
                    strTemp = `${strTemp}${intTemp - 53}`;
                }
                else if (intTemp <= 90) {
                    strTemp = `${strTemp}${intTemp - 52}`;
                }
                else if (intTemp <= 105) {
                    strTemp = `${strTemp}${intTemp - 46}`;
                }
                else if (intTemp <= 114) {
                    strTemp = `${strTemp}${intTemp - 45}`;
                }
                else if (intTemp <= 122) {
                    strTemp = `${strTemp}${intTemp - 44}`;
                }
            }
            else {
                strTemp = `${strTemp}${value.substr(counter + 1, 2)}`;
                counter += 2;
            }
        }
        return strTemp;
    }
    decode(value) {
        let strTemp = ``;
        if (value.length > 2) {
            let temp = value.substr(2, value.length - 4);
            strTemp = `${value[0]}${this.nomascii(temp)}${value[value.length - 1]}`;
        }
        else
            strTemp = value;
        return strTemp;
    }
    asciinom(value) {
        let strTemp = "";
        for (let counter = 0; counter < value.length / 2; counter++) {
            let intTemp = parseInt(value.substr(counter * 2, 2));
            if (intTemp <= 19) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 54)}`; //54
            }
            else if (intTemp <= 29) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 53)}`; //53
            }
            else if (intTemp <= 38) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 52)}`; //52
            }
            else if (intTemp <= 39) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 9)}`; // 9
            }
            else if (intTemp <= 49) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 8)}`; // 8
            }
            else if (intTemp <= 59) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 46)}`; //46
            }
            else if (intTemp <= 69) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 45)}`; //45
            }
            else if (intTemp <= 78) {
                strTemp = `${strTemp}${String.fromCharCode(intTemp + 44)}`; //44
            }
            else {
                strTemp = `${strTemp}.${intTemp}`;
            }
        }
        return strTemp;
    }
}
exports.default = Decrypt;
