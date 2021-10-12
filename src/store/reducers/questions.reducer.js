import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  USER_ADD_QUESTION,
  ANSWER_QUESTION,
  USER_ANSWER_QUESTION,
} from "../actions/actionTypes";

export default function questionsReducer(questions = [], action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return [...questions, ...Object.values(action.payload)];
    case ADD_QUESTION: {
      return [...questions, action.payload];
    }
    case ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action.payload;
      const newQusetions = questions.map((ques) => {
        if (ques.id === qid) {
          ques[answer].votes.push(authedUser);
        }
        return ques;
      });
      return newQusetions;
    }
    default:
      return questions;
  }
}
