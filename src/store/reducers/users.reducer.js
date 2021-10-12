import {
  RECEIVE_USERS,
  USER_ADD_QUESTION,
  USER_ANSWER_QUESTION,
} from "../actions/actionTypes";
import questionsReducer from "./questions.reducer";

export default function usersReducer(users = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return [...users, ...Object.values(action.payload)];
    case USER_ADD_QUESTION: {
      const { qid, authedUser } = action.payload;
      const newUsers = users.map((u) => {
        if (u.id === authedUser) {
          u.questions = [...u.questions, qid];
        }
        return u;
      });
      return newUsers;
    }
    case USER_ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action.payload;
      const newUsers = users.map((u) => {
        if (u.id === authedUser) {
          u.answers = { ...u.answers, [qid]: answer };
        }
        return u;
      });
      return newUsers;
    }
    default:
      return users;
  }
}
