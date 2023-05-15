const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'Localhost',
  user: 'root',
  password: 'password',
  database: 'usuarios'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const user = {
    username,
    password
  };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error en el registro de usuario' });
    } else {
      res.send({ message: 'Usuario registrado exitosamente' });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error en el inicio de sesión' });
    } else {
      if (results.length > 0) {
        res.send({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).send({ message: 'Credenciales inválidas' });
      }
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

