"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor() {
    }
    responseError(req, res, error) {
        return res.status(500).json({
            success: false,
            message: error
        });
    }
    ;
}
exports.BaseController = BaseController;
