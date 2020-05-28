const request = require("supertest");
var app = require("../../server");
const req = request(app);

describe("GET /", () => {
  it("get /", (done) => {
    req
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(JSON.stringify({ message: "Hello world" }))
      .expect(200, done);
  });
});

describe("Post /", () => {

  it("should return invalid request error message", (done) => {
    req
      .post("/generate")
      .send({
        mobileNumber: "12",
        start: 0,
        end: null,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        JSON.stringify({
          error: "Invalid request"
        })
      )
      .expect(200, done);
  });

  it("should return error message", (done) => {
    req
      .post("/generate")
      .send({
        mobileNumber: "12",
        start: 0,
        end: 9,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        JSON.stringify({
          error: "Invalid data",
          message: "Mobile number should have minimum 7 digits",
        })
      )
      .expect(200, done);
  });

  it("should return letter combinations", (done) => {
    req
      .post("/generate")
      .send({
        mobileNumber: "1111111",
        start: 0,
        end: 9,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        JSON.stringify({
          count: 1,
          results: ["1111111"],
        })
      )
      .expect(200, done);
  });
});
