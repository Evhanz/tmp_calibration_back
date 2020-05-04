import ControlConnection from '../databases/control.connection';
import { CONTROL_QUERY } from '../databases/queries/control.query';
import { Request, Response } from 'express';
import Equipo from '../entities/Equipo';
import UserRepository from '../repository/UserRepository'
import * as jwt from "jsonwebtoken";
import config from "../config/config";



export default class UserController {

    static getAllUsers = async (req: Request, res: Response) => {
        // ControlConnection.executeQuery(CONTROL_QUERY.GET_ALL_USERS, (err: any, result: any) => {
        //     if (err) {
        //         return res.status(500).json({ err })
        //     }
        //     return res.status(200).json({ result })
        // })

        try {
            let equips: Equipo[] = await Equipo.findAll();
            return res.status(200).json({ equipos: equips });
        } catch (err) {
            return res.status(500).json({sucess:false});
        }
    };


    static logIn = async(req: Request, res: Response) =>{
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        //Get user from database
        let user: any;
        try {
          user = await UserRepository.findOne(username);
          if(user == null){
            res.status(401).send();
          }
        } catch (error) {
           // console.log(error)
          res.status(401).send();
        }

        //Check if encrypted password match
        if (!UserRepository.checkIfUnencryptedPasswordIsValid(password, user.contrasena)) {
          res.status(401).send();
          return;
        }
        

        //Sing JWT, valid for 1 hour
        let token = jwt.sign(
          { userId: user.id, username: user.usuario },
          config.jwtSecret,
          { expiresIn: "8h" }
        );

        //Send the jwt in the response
        res.send({accessToken:token});
    }



}


