import seed from "../server/db/setup.mjs";
import { client, connectToDb } from "../server/db/connection.mjs";
import request from "supertest";
import app from "../app.mjs";

import courses from "../server/data/courses.json" assert { type: "json" };
import users from "../server/data/users.json" assert { type: "json" };
import challenges from "../server/data/challenges.json" assert { type: "json" };
import achievements from "../server/data/achievements.json" assert { type: "json" };
import endpoints from "../endpoints.json" assert { type: "json" };

beforeEach(async () => {
  await seed(courses, users, challenges, achievements);
});

afterAll(async () => {
  await client.close();
});

describe("Invalid route error handling", () => {
  test("ERROR 404: responds with a 404 error for an invalid path", async () => {
    const res = await request(app).get("/not-a-path").expect(404);
    expect(res.body.msg).toBe("404 Error: Not Found");
  });
});

describe("GET /api", () => {
  test("GET 200: responds with an object describing all of the available endpoints", async () => {
    const res = await request(app).get("/api").expect(200);
    expect(res.body).toEqual({endpoints});
  });
});

describe("/api/users", () => {
  test("GET 200: responds with a named array of all users", async () => {
    const res = await request(app).get("/api/users").expect(200);
    expect(res.body).toHaveProperty("users");
    expect(typeof res.body.users).toBe("object");
    expect(res.body.users.length).toBe(6)
  });
  test("GET 200: every user object in the array should have the correct properties", async () => {
    const res = await request(app).get("/api/users").expect(200);
    const { users } = res.body;
    users.map((user) => {
      expect(user).toHaveProperty("_id");
      expect(user).toHaveProperty("user_id");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("join_date");
      expect(user).toHaveProperty("profile_picture");
      expect(user).toHaveProperty("bio");
      expect(user).toHaveProperty("languages");
      expect(user).toHaveProperty("achievements");
      expect(user).toHaveProperty("settings");
    });
  });
});

describe("/api/users/:id", () => {
  test('GET 200: should return a named array of the user object with the matching id', async () => {
    const res = await request(app).get("/api/users/U001").expect(200);
    expect(res.body).toHaveProperty("user")

    const {user} = res.body
    expect(typeof user).toBe("object")
    expect(user.length).toBe(1)
    expect(user[0].user_id).toEqual("U001")
  })
  test('GET 400: should return a 400 error when the id is of incorrect syntax', async () => {
    const res = await request(app).get("/api/users/__*&()").expect(400)
    expect(res.body.msg).toEqual("400 Error: Bad Request")
  })
  test("GET 404: should return a 404 error when the id could exist but doesn't", async () => {
    const res = await request(app).get("/api/users/U9873").expect(404)
    expect(res.body.msg).toEqual("404 Error: Resource Not Found")
  })
})
