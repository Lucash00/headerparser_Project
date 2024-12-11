// Requiere las dependencias
require('dotenv').config();
var express = require('express');
var app = express();

// Habilita CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Configura archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta del API para obtener los detalles de la solicitud
app.get('/api/whoami', function (req, res) {
  // Obtiene la IP pública del cliente
  const ipaddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;

  // Obtiene el idioma de la cabecera
  const language = req.headers['accept-language'].split(',')[0];

  // Obtiene el software (navegador y sistema operativo)
  const software = req.headers['user-agent'];

  // Devuelve los datos en formato JSON
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Escucha en el puerto definido por la variable de entorno o en el puerto 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
