const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const Routes = require('../routes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.static(path.join(__dirname, 'build')));
server.use(cors());

server.get('/', (req, res) => res.sendFile(path.join(__dirname, '../README.md')));

server.get('/api/quizzes', Routes.getQuizzes);
server.get('/api/quizzes/:id', Routes.getQuiz);
server.post('/api/quizzes/:id/attempt', Routes.postQuiz);

module.exports = server