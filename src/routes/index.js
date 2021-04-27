const quizzes = require('../../data/quizzes.json');

/**
 * Returns a list of quizzes with titles and IDs
 */
 
async function getQuizzes(req, res, next) {
  const quizzesObject = Object.values(quizzes)
  res.status(200).json(quizzesObject.map(quiz=>{
    return {
      id: quiz.id, 
      title: quiz.title
    }
  }))
}

/** 
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  const quizObject = quizzes[req.params.id]

  res.status(200).json({
    id: quizObject.id,
    title: quizObject.title,
    questions: quizObject.questions.map((question)=>{
      return {
        id: question.id,
        title: question.text,
        questions: question.options
      }
    })
  })
}

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
  const answerKeys = Object.keys(req.body.answers)

  // initial correct answers
  let correct = 0
  
  questions = {}

  quizzes[req.params.id].questions.forEach(question => {
    //determine if question is in the list of provided answers
    if(answerKeys.includes(question.id)){
      //determine if answer provided is correct
      if(req.body.answers[question.id] == question.answer ){
        questions = {...questions, [question.id]: true}
        correct++
      } else {
        questions = {...questions, [question.id]: false}
      }
    } else {
      //answer was not submitted
      questions = {...questions, [question.id]: false}
    }
  }); 

  res.status(200).json({
    correct,
    incorrect: (quizzes[req.params.id].questions.length - correct),
    questions
  })
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
