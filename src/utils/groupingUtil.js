// utils/groupingUtil.js

export const groupQuestionsByTopic = (questions) => {
    return questions.reduce((acc, question) => {
      const { topic } = question;
      if (!acc[topic]) acc[topic] = [];
      acc[topic].push(question);
      return acc;
    }, {});
  };
  