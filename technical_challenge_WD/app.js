var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



const phonesData = require('./data/phones.json');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);


app.set('trust proxy', 1); //VITAL FOR DEPLOYMENT
app.enable('trust proxy'); //VITAL FOR DEPLOYMENT
// The code below allows cross origin resource sharing from sever to react app.
app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

  
  // Ruta para el endpoint GET que devuelve el contenido de phones.json
  app.get('/phones', (req, res) => {
      // Cargar el archivo JSON directamente utilizando require()
      const phonesData = require('./data/phones.json');
      // Envía el contenido del archivo JSON como respuesta
      res.json(phonesData);
  });
  

  

// Ruta para obtener los detalles de un teléfono por su ID
app.get('/phones/:id', (req, res) => {
  // Cargar el archivo JSON
  const phonesData = require('./data/phones.json');
  
  // Obtener el ID del teléfono de los parámetros de la solicitud
  const id = parseInt(req.params.id);

  // Buscar el teléfono en el array de datos basado en su ID
  const phone = phonesData.find(phone => phone.id === id);

  // Verificar si se encontró el teléfono
  if (!phone) {
      // Si no se encuentra el teléfono, enviar una respuesta con un código de estado 404 (No encontrado)
      res.status(404).json({ message: 'Phone not found by ID' });
  } else {
      // Si se encuentra el teléfono, enviar sus detalles como respuesta
      res.json(phone);
  }
});




module.exports = app;
