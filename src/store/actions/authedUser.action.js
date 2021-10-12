import { LOGIN, LOGOUT } from "./actionTypes";

export const login = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: id,
    });
  };
};

export const logout = () => ({
  type: LOGOUT,
});
