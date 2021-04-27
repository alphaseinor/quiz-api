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
  console.log("post quiz")
  res.status(200).json({message:"post quiz", param: "id: " + req.params.id})
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
