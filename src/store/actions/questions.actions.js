import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  USER_ADD_QUESTION,
  ANSWER_QUESTION,
  USER_ANSWER_QUESTION,
} from "./actionTypes";
import { showLoading, hideLoading } from "react-redux-loading";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  payload: questions,
});

//add and answer questions
const addQuestion = (question) => ({
  type: ADD_QUESTION,
  payload: question,
});

const userAddQuestion = ({ authedUser, qid }) => ({
  type: USER_ADD_QUESTION,
  payload: {
    authedUser,
    qid,
  },
});

const answerQuestion = ({ authedUser, qid, answer }) => ({
  type: ANSWER_QUESTION,
  payload: {
    authedUser,
    qid,
    answer,
  },
});

const userAnswerQuestion = ({ authedUser, qid, answer }) => ({
  type: USER_ANSWER_QUESTION,
  payload: {
    authedUser,
    qid,
    answer,
  },
});

// handle adding and answering questions
export const setAddQuestion = ({ optionOneText, optionTwoText, author }) => {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(
          userAddQuestion({
            authedUser: author,
            qid: question.id,
          })
        );
        dispatch(addQuestion(question));
        dispatch(hideLoading());
      }
    );
  };
};

export const setAnswerQuestion = ({ authedUser, qid, answer }) => {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(userAnswerQuestion({ authedUser, qid, answer }));
      dispatch(answerQuestion({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
};
