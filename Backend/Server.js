const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', 
  database: 'login_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1); // Finaliza si hay un error
  }
  console.log('Conectado a la base de datos');
});

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar usuarios
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Insertar usuario en la base de datos
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'No se pudo crear el usuario' });
      }
      res.status(200).json({ success: true, message: 'Usuario creado exitosamente' });
    });
  });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  // Encriptar la contraseña para verificarla
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  // Verificar si el usuario existe y si la contraseña coincide
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }

    if (result.length > 0) {
      // Inicio de sesión exitoso
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      // Usuario o contraseña incorrectos
      res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
