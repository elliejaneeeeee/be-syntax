import { isValidId } from "../utils/isValidId";
import { createNewUserId } from "../utils/createNewUserId";
import { isValidFields } from "../utils/isValidFields";

describe("isValidId", () => {
  test("isValidId should return false for IDs with special characters", () => {
    const allCharsAreInvalid = isValidId("*&^%");
    const someCharsAreInvalid = isValidId("U**01!");
    const oneCharIsInvalid = isValidId("U0*1");

    expect(allCharsAreInvalid).toEqual(false);
    expect(someCharsAreInvalid).toEqual(false);
    expect(oneCharIsInvalid).toEqual(false);
  });
  test("isValidId should return false when the id doesn't start with 'U", () => {
    const notStartsWithU = isValidId("P1234");

    expect(notStartsWithU).toEqual(false);
  });
  test("isValidId should return true for IDs with no special characters", () => {
    const id = isValidId("U001");
    const longID = isValidId("U9837281");

    expect(id).toEqual(true);
    expect(longID).toEqual(true);
  });
});

describe("createNewUserId", () => {
  test("Should return a string", async () => {
    const res = await createNewUserId()
    expect(typeof res).toBe("string")
  })
  test("Should return a new id", async () => {
    const mockUsers = [
      { user_id: "U001"},
      { user_id: "U002"},
      { user_id: "U003"},
      { user_id: "U004"},
      { user_id: "U005"},
      { user_id: "U006"},
    ]

    const res = await createNewUserId()
    mockUsers.map((user) => {
      expect(user).not.toEqual(res)
    })
  })
})

describe("isValidFields", () => {
  test("Should return a boolean", () => {
    const res = isValidFields()
    expect(typeof res).toBe("boolean")
  })
  test("Should return true when all fields are valid", () => {
    const res = isValidFields("coder@example.com", "coderMaster", "Password123!")
    expect(res).toBe(true)
  })
  test("Should return false when all fields but one are valid", () => {
    const res = isValidFields("coder@example.com", "coderMaster", "insecurepassword")
    expect(res).toBe(false)
  })
  test("Should return false when all fields are invalid", () => {
    const res = isValidFields("invalid@email@.net", "code", "insecurepassword")
    expect(res).toBe(false)
  })
})
