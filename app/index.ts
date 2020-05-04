import bodyParser from 'body-parser';
import cors from 'cors';

import Server from './server/server';
import routes from './routes';
import sequelize from './databases/sequelize.connections';


const server = Server.instance;
// const connection = ControlConnection.instance;
// const connection =

//---------CONFIGURE BODY PARSE---------//
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//---------CONFIGURE BODY PARSE---------//

//---------CONFIGURE CORS---------//
server.app.use(cors({ origin: true, credentials: true }))
//---------CONFIGURE CORS---------//

//---------CONFIGURE ROUTES---------//
server.app.use('/', routes)
//---------CONFIGURE ROUTES---------//


sequelize.authenticate()
    .then(() => {
        console.log('Database connected!');
        server.start(() => {
            console.log(`server corriendo en el puerto ${server.port}`);
        });
    }).catch((err) => {
        console.log(err);
    })