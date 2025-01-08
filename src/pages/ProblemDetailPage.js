import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import '../styles/ProblemDetailPage.css';

const ProblemDetailPage = () => {
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([
    { input: '[1, 2, 3]', expectedOutput: '[3, 2, 1]', status: '' },
    { input: '[4, 5, 6]', expectedOutput: '[6, 5, 4]', status: '' },
  ]);
  const [resultMessage, setResultMessage] = useState('');

  const handleRunCode = () => {
    const results = testCases.map((testCase) => {
      try {
        // Evaluate user code with test cases (simplified example)
        const userOutput = eval(`(() => { ${code}; return reverse(${testCase.input}); })()`);
        const isPass = JSON.stringify(userOutput) === testCase.expectedOutput;
        return { ...testCase, status: isPass ? 'Pass' : 'Fail' };
      } catch (error) {
        return { ...testCase, status: 'Error' };
      }
    });

    setTestCases(results);

    const allPass = results.every((test) => test.status === 'Pass');
    setResultMessage(allPass ? 'Great job! You solved this!' : 'Some tests failed. Please try again!');
  };

  const handleSubmitCode = () => {
    const allPass = testCases.every((test) => test.status === 'Pass');
    if (allPass) {
      alert('Code submitted successfully!');
    } else {
      alert('Please fix the failing test cases before submitting.');
    }
  };

  return (
    <div className="problem-detail-page">
      <header className="navbar">
        <button className="btn" onClick={() => window.history.back()}>Back to Dashboard</button>
        <h1>Reverse an Array</h1>
        <button className="btn logout">Logout</button>
      </header>

      <main className="content">
        <section className="problem-details">
          <h2>Problem Details</h2>
          <p><strong>Title:</strong> Reverse an Array</p>
          <p><strong>Description:</strong> Given an array, reverse it.</p>
          <p><strong>Constraints:</strong> Array length ≤ 1000</p>
          <p><strong>Example Input:</strong> [1, 2, 3]</p>
          <p><strong>Example Output:</strong> [3, 2, 1]</p>
        </section>

        <section className="code-editor">
          <h2>Code Editor</h2>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
          />
          <div className="editor-buttons">
            <button className="btn" onClick={handleRunCode}>Run</button>
            <button className="btn" onClick={handleSubmitCode}>Submit</button>
          </div>
        </section>

        <section className="test-cases">
          <h2>Test Cases</h2>
          <ul>
            {testCases.map((testCase, index) => (
              <li key={index} className={`test-case ${testCase.status.toLowerCase()}`}>
                <p><strong>Input:</strong> {testCase.input}</p>
                <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
                <p><strong>Status:</strong> {testCase.status || 'Not Run'}</p>
              </li>
            ))}
          </ul>
          <p className="result-message">{resultMessage}</p>
        </section>
      </main>

      <footer className="footer">
        <nav>
          <button className="btn">Previous Question</button>
          <button className="btn">Next Question</button>
        </nav>
        <div className="footer-links">
          <a href="#">FAQs</a> | <a href="#">Contact Us</a> | <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};





export default ProblemDetailPage;
