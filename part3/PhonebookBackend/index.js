/* eslint-disable @stylistic/js/semi */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('dist'));
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use((req, res, next) => {
  if (req.path.startsWith('/')) {
    console.log(`Static file requested: ${req.path}`);
  }
  next();
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/api/persons/info', (request, response) => {
  const now = new Date();
  Person.find({}).then((result) => {
    response.send(
      `<p>Phonebook has info for ${result.length
      } people </p> <p>${now.toString()}</p>`
    );
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (body.name === '')
    return response.status(400).json({
      error: 'name missing',
    });

  if (body.number === '')
    return response.status(400).json({
      error: 'number missing',
    });

  Person.findOne({ name: body.name }).then((p) => {
    if (p) {
      p.number = body.number;
      p.save().then((updated) => {
        response.json(updated);
      });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person.save().then((person) => {
        response.json(person);
      });
    }
  });
});

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'NotFound') {
    return response.status(404).send({ error: 'Not found' });
  }
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'Malformatted id',
    });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
