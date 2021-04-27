const request = require("supertest");
const server = require("../api/server.js")
const quizzes = require('../../data/quizzes.json')

/** 
 * GET Quizzes List Endpoint
 */

describe("quizzes endpoint", () => {
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

describe("quizzes/math endpoint", ()=>{
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