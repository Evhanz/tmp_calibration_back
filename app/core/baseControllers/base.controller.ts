import { Request, Response } from 'express';


export  class BaseController {

    constructor(){

    }
    protected responseError(req: Request, res: Response, error: any) {
       
        return res.status(500).json({
            success: false,
            message: error

        })
    };

    


}