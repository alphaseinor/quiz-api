const request = require("supertest");
const server = require("../api/server.js")
const quizzes = require('../../data/quizzes.json')

describe("default route", () => {
  it("should return a status of 200", (done) => {
    request(server)
      .get("/api/quizzes")
      .then(res=>{
        expect(res.status).toBe(200)
        done()
      })
  });
  it("should return JSON", (done) => {
    request(server)
      .get("/api/quizzes")
      .then(res=>{
        expect(res.type).toMatch(/json/i)
        done()
      })
  });
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
        expect(Object.keys(res.body[1])).toContain('id')
        expect(Object.keys(res.body[1])).toContain('title')
        done()
      })
  })
  
});