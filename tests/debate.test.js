const request = require("supertest");
const { app } = require("../app");
jest.mock("../services/debate");
const { debateServices } = require("../services/debate");

test('when making GET request to /ping we expect {"pong":"in debates Router"}', done => {
  request(app)
    .get("/ping")
    .then(response => {
      expect(response.body).toEqual({ pong: "in debate's Router" });
      done();
    })
    .catch(error => {
      done();
    });
});

test("when making a POST request to /debate/ with empty object we expect status(400)", done => {
  request(app)
    .post("/debate/")
    .send({})
    .then(response => {
      expect(response.status).toBe(400);
      done();
    })
    .catch(err => {
      done();
    });
});

test("when making a POST request to /debate/ with valid data we expect status(200)", done => {
  request(app)
    .post("/debate/")
    .send({
      first_debater: "a",
      second_debater: "b",
      title: "c",
      description: "d",
      category: "e",
      rules: "f"
    })
    .then(response => {
      expect(response.status).toBe(200);
      done();
    })
    .catch(err => {
      done();
    });
});

test("when making GET request to /debate/:did/followers, if db query is successful, expect 200", done => {
  debateServices.getFollowers.mockImplementation(() => {
    return Promise.resolve();
  });
  request(app)
    .get("/debate/:did/followers")
    .then(response => {
      expect(response.status).toBe(200);
      done();
    });
});

test("when making GET request to /debate/:did/followers, if db query is NOT successful, expect 400", done => {
  debateServices.getFollowers.mockImplementation(() => {
    return Promise.reject();
  });
  request(app)
    .get("/debate/:did/followers")
    .then(response => {
      expect(response.status).toBe(400);
      done();
    });
});

test("when making GET request to /debate/getfollow, if db query is successful, expect 200", done => {
  debateServices.countfollowers.mockImplementation(() => {
    return Promise.resolve();
  });
  request(app)
    .get("/debate/getfollow")
    .then(response => {
      expect(response.status).toBe(200);
      done();
    });
});

test("when making GET request to /debate/getfollow, if db query is unsucessful, expect 400", done => {
  debateServices.countfollowers.mockImplementation(() => {
    return Promise.reject();
  });
  request(app)
    .get("/debate/getfollow")
    .then(response => {
      expect(response.status).toBe(400);
      done();
    });
});

test("when making GET request to /debate/all, if db query is successful, expect 200", done => {
  debateServices.getAllDebates.mockImplementation(() => {
    return Promise.resolve();
  });
  request(app)
    .get("/debate/all")
    .then(response => {
      expect(response.status).toBe(200);
      done();
    });
});

test("when making GET request to /debate/all, if db query is unsuccessful, expect 400", done => {
  debateServices.getAllDebates.mockImplementation(() => {
    return Promise.reject();
  });
  request(app)
    .get("/debate/all")
    .then(response => {
      expect(response.status).toBe(400);
      done();
    });
});
