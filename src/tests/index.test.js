const request = require("supertest");
const server = require("../api/server.js")
const quizzes = require('../../data/quizzes.json')

/** 
 * GET root Endpoint
 */

 describe("GET quizzes endpoint", () => {
   it("should return a status of 200", (done) =>{
    request(server)
    .get("/")
    .then(res=>{
      expect(res.status).toBe(200)
      done()
    })
   })
 })

/** 
 * GET Quizzes List Endpoint
 */

describe("GET quizzes endpoint", () => {

  it("should return a status of 200", (done) => {
    request(server)
      .get("/api/quizzes")
      .then(res=>{
        expect(res.status).toBe(200)
        done()
      })
  })

  it("should return JSON", (done) => {
    request(server)
      .get("/api/quizzes")
      .then(res=>{
        expect(res.type).toMatch(/json/i)
        done()
      })
  })

  it("passes cycle count", (done) =>{
    request(server)
      .get('/api/quizzes')
      .then(res=>{
        expect(res.body.length).toBe(Object.values(quizzes).length)
        done()
      })
  })

  it("has correct shape", (done) =>{
    request(server)
      .get('/api/quizzes')
      .then(res=>{
        expect(Object.keys(res.body[0])).toContain('id')
        expect(Object.keys(res.body[0])).toContain('title')
        done()
      })
  })
  
})

/** 
 * GET Quiz Endpoint
 */

describe("GET quizzes/math endpoint", ()=>{

  it("should return 404 if id is incorrect", (done) => {
    request(server)
      .get("/api/quizzes/math1" )
      .then(res=>{
        expect(res.status).toBe(404)
        done()
      })
  })

  it("should return a status of 200", (done) => {
    request(server)
      .get("/api/quizzes/math")
      .then(res=>{
        expect(res.status).toBe(200)
        done()
      })
  })

  it("should return JSON", (done) => {
    request(server)
      .get("/api/quizzes/math")
      .then(res=>{
        expect(res.type).toMatch(/json/i)
        done()
      })
  })

  it("has correct shape", (done) =>{
    request(server)
      .get('/api/quizzes/math')
      .then(res=>{
        expect(Object.keys(res.body)).toContain('id')
        expect(Object.keys(res.body)).toContain('title')
        expect(Object.keys(res.body)).toContain('questions')
        done()
      })
  })

  it("should return correct question count", (done) => {
    request(server)
      .get("/api/quizzes/math")
      .then(res=>{
        expect(res.body.questions.length).toBe(quizzes.math.questions.length)
        done()
      })
  })
})

/** 
 * POST Quiz Endpoint
 */

describe("POST quizzes/math endpoint", ()=>{

  const correctObject = {
    "answers": {
      "question_1": "2",
      "question_2": "True",
      "question_3": "7"
    }
  }

  const incorrectObject = {
    "answers": {
    }
  }

  const PartialCorrectObject = {
    "answers": {
      "question_2": "True",
    }
  }
  

  it("should return 404 if no answers object", (done) => {
    request(server)
      .post("/api/quizzes/math/attempt" )
      .then(res=>{
        expect(res.status).toBe(404)
        done()
      })
  })

  it("should return 404 if id is incorrect", (done) => {
    request(server)
      .post("/api/quizzes/math1/attempt" )
      .then(res=>{
        expect(res.status).toBe(404)
        done()
      })
  })

  it("should return 200 if id and body are valid", (done) => {
    const post = 
    request(server)
      .post("/api/quizzes/math/attempt")
      .send(correctObject)
      .then(res=>{
        expect(res.status).toBe(200)
        done()
      })
  })

  it("should return 3 correct answers", (done) => {
    request(server)
      .post("/api/quizzes/math/attempt")
      .send(correctObject)
      .then(res=>{
        expect(res.body.correct).toBe(3)
        done()
      })
  })

  it("should return 1 correct answer", (done) => {
    request(server)
      .post("/api/quizzes/math/attempt")
      .send(PartialCorrectObject)
      .then(res=>{
        expect(res.body.correct).toBe(1)
        done()
      })
  })

  it("should return no correct answers", (done) => {
    request(server)
      .post("/api/quizzes/math/attempt")
      .send(incorrectObject)
      .then(res=>{
        expect(res.body["correct"]).toBe(0)
        done()
      })
  })
})