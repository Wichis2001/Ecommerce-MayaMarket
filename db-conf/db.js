npm install bcryptjs

use eCommerce

db.createCollection('roles')

db.roles.insertMany([
    {
        'rol': 'COMMON_ROLE'
    },
    {
        'rol': 'ADMIN_ROLE'
    }
])

db.createCollection('usuarios')

const bcrypt = require('bcryptjs');
db.usuarios.insertMany([
    {
        'nombre': 'common1',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'COMMON_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    },
    {
        'nombre': 'common2',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'COMMON_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    },
    {
        'nombre': 'common3',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'COMMON_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    },
    {
        'nombre': 'common4',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'COMMON_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    },
    {
        'nombre': 'common5',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'COMMON_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    },
    {
        'nombre': 'admin1',
        'password': bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        'rol': 'ADMIN_ROLE',
        'estado': true,
        'quetzal': 500.00,
        'cacao': 100.00,
        'aprobado': true
    }
])

db.createCollection('categorias')

db.categorias.insertMany([
    {
        'nombre': 'Tecnología',
        'estado': true
    },
    {
        'nombre': 'Hogar',
        'estado': true
    },
    {
        'nombre': 'Académico',
        'estado': true
    },
    {
        'nombre': 'Literatura',
        'estado': true
    },
    {
        'nombre': 'Decoración',
        'estado': true
    },
    {
        'nombre': 'Otros',
        'estado': true
    }
])

db.createCollection('tarjetas')

db.createCollection('productos')

usuario = db.usuarios.findOne({ nombre: 'common1'}, { _id: 1 });
id = usuario._id
campo_hogar = db.categorias.findOne({ nombre: 'Hogar' }, { _id: 1 });
hogar= campo_hogar._id;
campo_tecnologia = db.categorias.findOne({ nombre: 'Tecnología'}, { _id: 1 });
tecnologia = campo_tecnologia._id;
db.productos.insertMany([
    {   
        'nombre'        : 'Crema para el cabello',
        'descripcion'   : 'Eficiente crema para tu cabello',
        'img'           : 'crema.jpg',
        'precio'        : 33.00,
        'usuario'       : id,
        'existencia'    : 15,
        'categoria'     : hogar,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Shampoo para hombre',
        'descripcion'   : 'Shampoo enfocado a todo tipo de cabellos',
        'img'           : 'shampoo_hombre.png',
        'precio'        : 45.00,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : hogar,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Shampoo para mujer',
        'descripcion'   : 'Shampoo enfocado para todo tipo de cabellos',
        'img'           : 'shampoo_mujer.jpg',
        'precio'        : 50.00,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : hogar,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Desodorante para mujer',
        'descripcion'   : 'Desodorante destinado para mujeres',
        'img'           : 'desodorante_mujer.jpg',
        'precio'        : 17.00,
        'usuario'       : id,
        'existencia'    : 8,
        'categoria'     : hogar,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Desodorante para hombre',
        'descripcion'   : 'Desodorante destinado para hombres',
        'img'           : 'desodorante_hombre.jpg',
        'precio'        : 15.00,
        'usuario'       : id,
        'existencia'    : 4,
        'categoria'     : hogar,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Iphone X',
        'descripcion'   : 'Teléfono Iphone X en excelente estado',
        'img'           : 'iphone-x.png',
        'precio'        : 4500,
        'usuario'       : id,
        'existencia'    : 2,
        'categoria'     : tecnologia,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Iphone 11',
        'descripcion'   : 'Teléfono Iphone 11 en excelente estado',
        'img'           : 'iphone-11.jpg',
        'precio'        : 5000,
        'usuario'       : id,
        'existencia'    : 7,
        'categoria'     : tecnologia,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Iphone 12',
        'descripcion'   : 'Teléfono Iphone 12 en excelente estado',
        'img'           : 'iphone-12.jpg',
        'precio'        : 6500,
        'usuario'       : id,
        'existencia'    : 4,
        'categoria'     : tecnologia,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Iphone 13',
        'descripcion'   : 'Teléfono Iphone 13 en excelente estado',
        'img'           : 'iphone-13.jpg',
        'precio'        : 7500,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : tecnologia,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Iphone 14',
        'descripcion'   : 'Teléfono Iphone 14 en excelente estado',
        'img'           : 'iphone-14.jpg',
        'precio'        : 9800,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : tecnologia,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    }
])

usuario = db.usuarios.findOne({ nombre: 'common2'}, { _id: 1 });
id = usuario._id;
campo_otros = db.categorias.findOne({ nombre: 'Otros' }, { _id: 1 });
otros= campo_otros._id;

db.productos.insertMany([
    {   
        'nombre'        : 'Perros Beagle',
        'descripcion'   : 'Hermosos perros de raza Beagle, listos para hacerte compañia',
        'img'           : 'beagle.jpg',
        'precio'        : 750,
        'usuario'       : id,
        'existencia'    : 5,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Chihuahua',
        'descripcion'   : 'Hermosos perros de raza Chihuahua, listos para hacerte compañia',
        'img'           : 'chihuahua.jpg',
        'precio'        : 500,
        'usuario'       : id,
        'existencia'    : 2,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Chow chow',
        'descripcion'   : 'Hermosos perros de raza Chow chow, listos para hacerte compañia',
        'img'           : 'chow-chow.jpg',
        'precio'        : 900,
        'usuario'       : id,
        'existencia'    : 7,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Dálmata',
        'descripcion'   : 'Hermosos perros de raza Dálmata, listos para hacerte compañia',
        'img'           : 'dalmata.jpg',
        'precio'        : 1200,
        'usuario'       : id,
        'existencia'    : 15,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Galgo',
        'descripcion'   : 'Hermosos perros de raza Galgo, listos para hacerte compañia',
        'img'           : 'galgo.jpg',
        'precio'        : 785,
        'usuario'       : id,
        'existencia'    : 9,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Golden Retriever',
        'descripcion'   : 'Hermosos perros de raza Golden Retriever, listos para hacerte compañia',
        'img'           : 'golden.jpg',
        'precio'        : 985,
        'usuario'       : id,
        'existencia'    : 30,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Komondor',
        'descripcion'   : 'Hermosos perros de raza Komondor, listos para hacerte compañia',
        'img'           : 'komondor.jpg',
        'precio'        : 2000,
        'usuario'       : id,
        'existencia'    : 2,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Labrador',
        'descripcion'   : 'Hermosos perros de raza Labrador, listos para hacerte compañia',
        'img'           : 'labrador.jpg',
        'precio'        : 685,
        'usuario'       : id,
        'existencia'    : 1,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Husky',
        'descripcion'   : 'Hermosos perros de raza Husky, listos para hacerte compañia',
        'img'           : 'husky.jpg',
        'precio'        : 965,
        'usuario'       : id,
        'existencia'    : 8,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Perros Pastor Alemán',
        'descripcion'   : 'Hermosos perros de raza Pastor Alemán, listos para hacerte compañia',
        'img'           : 'aleman.jpg',
        'precio'        : 1500,
        'usuario'       : id,
        'existencia'    : 4,
        'categoria'     : otros,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    }
])

usuario = db.usuarios.findOne({ nombre: 'common3'}, { _id: 1 });
id = usuario._id;
campo_decoracion = db.categorias.findOne({ nombre: 'Decoración' }, { _id: 1 });
decoracion= campo_decoracion._id;

db.productos.insertMany([
    {   
        'nombre'        : 'Escritorio de Madera',
        'descripcion'   : 'Escritorios de Madera listos para darle un look genial a tu habitación',
        'img'           : 'escritorio_madera.jpg',
        'precio'        : 800,
        'usuario'       : id,
        'existencia'    : 25,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Libreras de Madera',
        'descripcion'   : 'Libreras de Madera listas para darle un look genial a tu habitación',
        'img'           : 'librera_madera.jpg',
        'precio'        : 2000,
        'usuario'       : id,
        'existencia'    : 4,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Organizadores de Escritorio',
        'descripcion'   : 'Organizadores de Escritorio listos para darle un look genial a tu habitación',
        'img'           : 'organizador_escritorio.jpg',
        'precio'        : 125,
        'usuario'       : id,
        'existencia'    : 80,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Gavetas',
        'descripcion'   : 'Gavetas listas para darle un look genial a tu habitación',
        'img'           : 'gavetas.png',
        'precio'        : 180,
        'usuario'       : id,
        'existencia'    : 85,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Pizarras',
        'descripcion'   : 'Pizarras listas para darle un look genial a tu habitación',
        'img'           : 'pizarra.jpg',
        'precio'        : 100,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Sillas de Oficina',
        'descripcion'   : 'Sillas de Oficina listas para darle un look genial a tu habitación',
        'img'           : 'silla.jpg',
        'precio'        : 660,
        'usuario'       : id,
        'existencia'    : 6,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Sillas Gamer',
        'descripcion'   : 'Sillas Gamer listas para darle un look genial a tu habitación',
        'img'           : 'silla_gamer.jpg',
        'precio'        : 800,
        'usuario'       : id,
        'existencia'    : 30,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Contenedores',
        'descripcion'   : 'Contenedores listos para darle un look genial a tu habitación',
        'img'           : 'contenedores.jpg',
        'precio'        : 90,
        'usuario'       : id,
        'existencia'    : 5,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Hampers',
        'descripcion'   : 'Hampers listos para darle un look genial a tu habitación',
        'img'           : 'hampers.jpg',
        'precio'        : 35,
        'usuario'       : id,
        'existencia'    : 15,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Recuadros de Mario',
        'descripcion'   : 'Recuadros de Mario listos para darle un look genial a tu habitación',
        'img'           : 'mario.jpg',
        'precio'        : 250,
        'usuario'       : id,
        'existencia'    : 5,
        'categoria'     : decoracion,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    }
])

usuario = db.usuarios.findOne({ nombre: 'common4'}, { _id: 1 });
id = usuario._id;
campo_literatura = db.categorias.findOne({ nombre: 'Literatura' }, { _id: 1 });
literatura= campo_literatura._id;

db.productos.insertMany([
    {   
        'nombre'        : 'Pack Tokyo Revengers',
        'descripcion'   : 'Pack de libros de Tokyo Revengers listos para una lectura profunda',
        'img'           : 'tokyo.png',
        'precio'        : 1015,
        'usuario'       : id,
        'existencia'    : 5,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Saga Maze Runenr',
        'descripcion'   : 'Pack de Saga de Maze Runner listos para una lectura profunda',
        'img'           : 'maze.jpg',
        'precio'        : 405,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Divina Comedia',
        'descripcion'   : 'Pack de la Divina Comedia listos para una lectura profunda',
        'img'           : 'divina.jpg',
        'precio'        : 505,
        'usuario'       : id,
        'existencia'    : 8,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Pack George Orwell',
        'descripcion'   : 'Pack de George Orewell para una lectura profunda',
        'img'           : 'george.jpg',
        'precio'        : 215,
        'usuario'       : id,
        'existencia'    : 15,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Pack Biología Sofía',
        'descripcion'   : 'Pack de Biología Sofía para una lectura profunda',
        'img'           : 'biologia.jpg',
        'precio'        : 239,
        'usuario'       : id,
        'existencia'    : 25,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Trilogía Culpables',
        'descripcion'   : 'Pack de Trilogía de Culpables para una lectura profunda',
        'img'           : 'culpables.jpg',
        'precio'        : 325,
        'usuario'       : id,
        'existencia'    : 75,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Trilogía de la Nube blanca',
        'descripcion'   : 'Pack de Trilogía de la Nube blanca para una lectura profunda',
        'img'           : 'nube.jpg',
        'precio'        : 395,
        'usuario'       : id,
        'existencia'    : 25,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Trilogía de Africanus',
        'descripcion'   : 'Pack de Trilogía de Africanus para una lectura profunda',
        'img'           : 'africanus.jpg',
        'precio'        : 359,
        'usuario'       : id,
        'existencia'    : 25,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Tetralogía Hush Hush',
        'descripcion'   : 'Pack de Tetralogía Hush Hush para una lectura profunda',
        'img'           : 'hush.jpg',
        'precio'        : 479,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Estuche la Selección',
        'descripcion'   : 'Estuche de la Selección para una lectura profunda',
        'img'           : 'poe.jpg',
        'precio'        : 359,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : literatura,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    }
])

usuario = db.usuarios.findOne({ nombre: 'common5'}, { _id: 1 });
id = usuario._id;
campo_academico = db.categorias.findOne({ nombre: 'Académico' }, { _id: 1 });
academico= campo_academico._id;

db.productos.insertMany([
    {   
        'nombre'        : 'Abaco de Plastico',
        'descripcion'   : 'Abaco de plastico para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'abaco.jpg',
        'precio'        : 23.75,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Acuarela',
        'descripcion'   : 'Acuarela para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'acuarelas.jpeg',
        'precio'        : 8.10,
        'usuario'       : id,
        'existencia'    : 40,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Almohadilla para pizarra',
        'descripcion'   : 'Almohadilla para pizarra para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'almohadilla.jpeg',
        'precio'        : 7,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Block Papel Bond',
        'descripcion'   : 'Block de Papel Bond para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'papel.png',
        'precio'        : 15.35,
        'usuario'       : id,
        'existencia'    : 20,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Duo Pack Borrador',
        'descripcion'   : 'Duo Pack Borrador para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'borrador.jpg',
        'precio'        : 4.10,
        'usuario'       : id,
        'existencia'    : 8,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Calculadora Cientifica',
        'descripcion'   : 'Calculadora Cientifica para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'calculadora.png',
        'precio'        : 46.25,
        'usuario'       : id,
        'existencia'    : 8,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Cuaderno de Caligrafía',
        'descripcion'   : 'Cuaderno de Caligrafía para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'caligrafia.png',
        'precio'        : 39.60,
        'usuario'       : id,
        'existencia'    : 2,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Carton Presentación',
        'descripcion'   : 'Carton Presentación para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'carton.jpg',
        'precio'        : 30.60,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Cartuchera',
        'descripcion'   : 'Cartuchera para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'cartuchera.png',
        'precio'        : 17.05,
        'usuario'       : id,
        'existencia'    : 10,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    },
    {   
        'nombre'        : 'Compas',
        'descripcion'   : 'Compas para que puedas agregarlo a tu lista de útiles escolares',
        'img'           : 'compas.png',
        'precio'        : 5.15,
        'usuario'       : id,
        'existencia'    : 2,
        'categoria'     : academico,
        'aprobado'      : true,
        'rechazado'     : false,
        'estado'        : true
    }
])

db.createCollection('ventas')
