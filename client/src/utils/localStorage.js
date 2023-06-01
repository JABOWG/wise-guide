export const getSavedQuestionIds = () => {
  const savedQuestionIds = localStorage.getItem('saved_questions')
    ? JSON.parse(localStorage.getItem('saved_questions'))
    : [];

  return savedQuestionIds;
};

export const saveQuestionIds = (questionIdArr) => {
  if (questionIdArr.length) {
    localStorage.setItem('saved_questions', JSON.stringify(questionIdArr));
  } else {
    localStorage.removeItem('saved_questions');
  }
};

export const removeQuestionByTitle = (questionTitle) => {
  const savedQuestionIds = localStorage.getItem('saved_questions')
    ? JSON.parse(localStorage.getItem('saved_questions'))
    : null;

  if (!savedQuestionIds) {
    return false;
  }

  const updatedSavedQuestionIds = savedQuestionIds?.filter(
    (savedQuestionTitle) => savedQuestionTitle !== questionTitle
  );
  localStorage.setItem('saved_questions', JSON.stringify(updatedSavedQuestionIds));

  return true;
};
