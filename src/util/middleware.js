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

module.exports = {validateID}