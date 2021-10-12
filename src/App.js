// Imports
import React, { Component, Fragment } from "react";
import LoadingBar from "react-redux-loading";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { connect } from "react-redux";
import "./App.css";
import { setInitialData } from "./store/actions/user-question.action";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import Qusetion from "./components/Question";
// import Pagenotexist from "../mocks/Pagenotexist";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(setInitialData());
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar style={{ backgroundColor: "rgb(0, 163, 155)" }} />
          <Header />
          <div className="container">
            <Switch>
              <PrivateRoute
                Component={Home}
                exact={true}
                path="/"
                authedUser={this.props.authedUser}
              />
              <PrivateRoute
                Component={LeaderBoard}
                exact={true}
                path="/leaderboard"
                authedUser={this.props.authedUser}
              />
              <PrivateRoute
                Component={NewQuestion}
                exact={true}
                path="/add"
                authedUser={this.props.authedUser}
              />

              <PrivateRoute
                Component={Qusetion}
                exact={true}
                path="/questions/:question_id"
                authedUser={this.props.authedUser}
              />
              <Route exact path="/login" name="Login" component={Login} />

              <Redirect to="/404" />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser,
    // loggedOut: authedUser === "LOGGED_OUT"
  };
}

// Export
export default connect(mapStateToProps)(App);
