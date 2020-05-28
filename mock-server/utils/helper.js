let letterCombinations = function (digits) {
  try {
    let map = [];
    map[0] = "0";
    map[1] = "1";
    map[2] = "abc";
    map[3] = "def";
    map[4] = "ghi";
    map[5] = "jkl";
    map[6] = "mno";
    map[7] = "pqrs";
    map[8] = "tuv";
    map[9] = "wxyz";

    let result = [];

    if (digits == null || digits.length === 0) return result;

    let temp = [];
    getString(digits, temp, result, map);

    return result;
  } catch (error) {
    return error;
  }
};

let getString = function (digits, temp, result, map) {
  if (digits.length === 0) {
    let arr = [];
    for (let i = 0; i < temp.length; i++) {
      arr[i] = temp[i];
    }
    result.push(arr.join(""));
    return;
  }

  let curr = parseInt(digits.substring(0, 1));
  let letters = map[curr];
  for (let i = 0; i < letters.length; i++) {
    temp.push(letters.charAt(i));
    getString(digits.substring(1), temp, result, map);
    temp.pop();
  }
};

let validateDigits = function (digits) {
  let errorMessage = '';
  let regexp = new RegExp("^[0-9]*$");

  if (digits.length < 7) {
    errorMessage = "Mobile number should have minimum 7 digits";
  }
  if (digits.length > 10) {
    errorMessage = "Mobile number should not exceed 10 digits";
  }
  if (regexp.test(digits) === false) {
    errorMessage = "Enter only numerics";
  }
  if(errorMessage) {
    return errorMessage;
  }
}

module.exports = {
  letterCombinations,
  validateDigits
};
