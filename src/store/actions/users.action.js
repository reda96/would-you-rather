import { RECEIVE_USERS } from "./actionTypes";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});
