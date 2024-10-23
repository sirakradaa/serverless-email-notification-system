const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/api");
const { User } = require("../src/models");
const AWS = require("aws-sdk-mock");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Registration API", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    AWS.mock("SQS", "sendMessage", (params, callback) => {
      callback(null, { MessageId: "12345" });
    });
  });

  afterEach(() => {
    AWS.restore("SQS");
  });

  it("should register a new user", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({ email: "test@example.com", name: "Test User" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("User registered successfully");
        done();
      });
  });

  // Add more tests for error handling, duplicate emails, etc.
});
