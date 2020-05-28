var helper = require("../../utils/helper");

describe("utils/helper", () => {
  describe("validateDigits ", () => {
    it("should return minimum length error message ", () => {
      const result = helper.validateDigits("123");
      expect(result).toEqual("Mobile number should have minimum 7 digits");
    });

    it("should return maximum length error message ", () => {
      const result = helper.validateDigits("123123123123");
      expect(result).toEqual("Mobile number should not exceed 10 digits");
    });

    it("should return invalid characters error message if number contains alphabets", () => {
      const result = helper.validateDigits("123abcdef");
      expect(result).toEqual("Enter only numerics");
    });

    it("should return invalid characters error message if number contains special characters", () => {
      const result = helper.validateDigits("123%12312");
      expect(result).toEqual("Enter only numerics");
    });

    it("should return undefined for valid number ", () => {
      const result = helper.validateDigits("23232323");
      expect(result).toBeUndefined();
    });
  });

  describe("letterCombinations ", () => {
    it("should return empty array if empty string is passed ", () => {
      const result = helper.letterCombinations("");
      expect(result.length).toEqual(0);
    });

    it("should return letter combinations array ", () => {
      const result = helper.letterCombinations("23");
      expect(result.length).toEqual(9);
      expect(result).toContain('be');
    });
  });
});
