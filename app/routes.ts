import { Router } from 'express'

import UserController from './controllers/user.controller';

const routes = Router();

//--------------------------------------------------------//
// ╔═╗╔═╗╔╦╗
// ║ ╦║╣  ║
// ╚═╝╚═╝ ╩
//--------------------------------------------------------//

routes.get('/api/v1/users', UserController.getAllUsers);

//--------------------------------------------------------//
// ╔═╗╔═╗╔═╗╔╦╗
// ╠═╝║ ║╚═╗ ║
// ╩  ╚═╝╚═╝ ╩
//--------------------------------------------------------//
routes.post('/auth/login', UserController.logIn);


//--------------------------------------------------------//
// ╔═╗╦ ╦╔╦╗
// ╠═╝║ ║ ║
// ╩  ╚═╝ ╩
//--------------------------------------------------------//

//--------------------------------------------------------//
// ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
//  ║║║╣ ║  ║╣  ║ ║╣
// ╚╩╝╚═╝╚═╝╚═╝ ╩ ╚═╝
//--------------------------------------------------------//


//--------------------------------------------------------//





export default routes;