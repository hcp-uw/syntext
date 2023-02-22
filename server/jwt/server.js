const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'super_duper_secret';

app.post('/jwt', (req, res) => {
  const sub = req.body.sub;
  const name = req.body.name;

  const token = jwt.sign({ sub, name }, secret, { expiresIn: '1h' });
  res.send({ token });
});

function validateJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

app.use(validateJWT);

app.listen(3001, () => {
  console.log('Server started on port 3001');
});