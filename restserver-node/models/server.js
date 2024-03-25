const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth        : '/api/auth',
            buscar      : '/api/buscar',
            categorias  : '/api/categorias',
            productos   : '/api/productos',
            tarjetas    : '/api/tarjetas',
            usuarios    : '/api/usuarios',
            uploads     : '/api/uploads',
            ventas      : '/api/ventas'
        }

        //!Middlewares Funciones que se ejecutan cuando levantemos el servidor
        this.middlewares();

        //?Conectar a base de datos
        this.conectarDB();

        //*Rutas de mi aplicación
        this.routes();
    };

    async conectarDB () {
        await dbConnection();
    }

    middlewares(){
        //?Cors
        this.app.use( cors() );

        //?Lectura y parseo del Body
        this.app.use(express.json());

        //?Directorio público
        this.app.use( express.static( 'public' ));

        //?Fileupload - Carga de archivos
        this.app.use( fileUpload ({
            useTempFiles    : true,
            tempFileDir     : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes') );
        this.app.use( this.paths.buscar, require('../routes/buscar.routes') );
        this.app.use( this.paths.categorias, require('../routes/categorias.routes') );
        this.app.use( this.paths.productos, require('../routes/productos.routes') );
        this.app.use( this.paths.tarjetas, require('../routes/tarjeta.routes') );
        this.app.use( this.paths.uploads, require('../routes/uploads.routes') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios.routes') );
        this.app.use( this.paths.ventas, require('../routes/venta.routes') );
    };

    listen(){
        this.app.listen( this.port, () => console.log('Servidor corriendo en puerto', this.port) );
    };

}

module.exports = Server;