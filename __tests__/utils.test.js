import { isValidId } from "../utils/isValidId";

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
