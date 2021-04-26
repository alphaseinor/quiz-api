const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const Routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../README.md')));

app.get('/api/quizzes', Routes.getQuizzes);
app.get('/api/quizzes/:id', Routes.getQuiz);
app.post('/api/quizzes/:id/attempt', Routes.postQuiz);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
