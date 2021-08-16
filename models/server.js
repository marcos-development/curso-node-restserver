const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.usuariosAPI = '/api/usuarios';

        // Conectar a base de datos
        this.connectToDatabase();

        // Middlerwares
        this.middlewares();

        // Rutas de aplicación
        this.routes();
    }

    async connectToDatabase() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static(path.join(__dirname, 'build')) );
    }

    routes() {
        
        this.app.use(this.usuariosAPI, require('../routes/user.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;