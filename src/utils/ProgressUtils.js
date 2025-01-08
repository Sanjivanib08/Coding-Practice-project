export const updateProgress = (currentProgress, newTestCaseResults) => {
    const totalTests = newTestCaseResults.length;
    const passedTests = newTestCaseResults.filter((test) => test.status === "Pass").length;
  
    const newProgress = (passedTests / totalTests) * 100;
  
    return {
      ...currentProgress,
      progress: newProgress,
      lastTestResults: newTestCaseResults,
    };
  };
  
  export const resetProgress = () => {
    return {
      progress: 0,
      lastTestResults: [],
    };
  };
  