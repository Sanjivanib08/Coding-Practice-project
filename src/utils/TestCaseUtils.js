// utils/testCaseUtil.js

// Function to evaluate user code against a test case
export const evaluateTestCase = (userCode, testCase) => {
    try {
      // Dynamically evaluate the user’s code with the test case input
      const result = new Function('input', `return ${userCode}`)(testCase.input);
      const isPass = JSON.stringify(result) === testCase.expectedOutput;
      return { ...testCase, status: isPass ? "Pass" : "Fail" };
    } catch (error) {
      // Return Error status if the user’s code has an issue
      return { ...testCase, status: "Error" };
    }
  };
  
  // Function to generate static test cases (which can be dynamic based on problem description)
  export const generateTestCases = () => {
    return [
      { input: '[1, 2, 3]', expectedOutput: '[3, 2, 1]', status: '' },
      { input: '[4, 5, 6]', expectedOutput: '[6, 5, 4]', status: '' },
      // You can generate more test cases dynamically based on problem description
    ];
  };
  