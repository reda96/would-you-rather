// Imports
import { LOGIN, LOGOUT } from "../actions/actionTypes";

export default function authUserReducer(authedUser = "", action) {
  switch (action.type) {
    case LOGIN: {
      return action.payload;
    }

    case LOGOUT:
      return "";

    default:
      return authedUser;
  }
}
