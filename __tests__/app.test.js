import seed from "../server/db/setup.mjs";
import { client, connectToDb } from "../server/db/connection.mjs";
import request from "supertest";
import app from "../app.mjs";

import courses from "../server/data/courses.json" assert { type: "json" };
import users from "../server/data/users.json" assert { type: "json" };
import challenges from "../server/data/challenges.json" assert { type: "json" };
import achievements from "../server/data/achievements.json" assert { type: "json" };

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

describe.only("/api/users", () => {
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
