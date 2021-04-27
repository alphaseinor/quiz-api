const quizzes = require('../../data/quizzes.json');

/**
 * Confirms ID is valid
 */

const validateID = (req, res, next) => {
    const quizKeys = Object.keys(quizzes)
    if(!quizKeys.includes(req.params.id)){
        res.status(404).json({message: `Sorry, '${req.params.id}' does not exist, please visit /api/quizzes for a list of quizzes`})
    }else{
        next()
    }
}

/**
 * Confirms POST shape is valid
 */

const validateQuizPostShape = (req, res, next) => {
    if(req.body.answers){
        next()
    }else{
        res.status(404).json({message: `Sorry, you must provide an answers object which contains questions.id:questions.option[] pairs received from the /quizzes/id GET request`})
    }
}


module.exports = {validateID, validateQuizPostShape}