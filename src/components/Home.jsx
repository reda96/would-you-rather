// Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import Poll from "./Poll";
import { withRouter } from "react-router";
class Home extends Component {
  render() {
    const { questionData } = this.props;
    const authedUser = this.props.authedUser;
    const panes = [
      {
        menuItem: "Unanswered Questions",
        render: () => (
          <Tab.Pane>
            {questionData.unanswered.map((question, index) => (
              <Poll
                authedUser={authedUser}
                key={index}
                question_id={question.id}
                unanswered={false}
                question={question}
              />
            ))}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Answered Questions",
        render: () => (
          <Tab.Pane>
            {questionData.answered.map((question, index) => (
              <Poll
                authedUser={authedUser}
                key={index}
                question_id={question.id}
                unanswered={true}
                question={question}
              />
            ))}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div>
        <Tab panes={panes} />{" "}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIDs = users.filter((user) => user.id === authedUser)[0].answers;

  const answered = questions
    .filter((question) => answeredIDs[question.id])
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = questions
    .filter((question) => !answeredIDs[question.id])
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    authedUser: authedUser,
    questionData: {
      answered,
      unanswered,
    },
  };
}
// Export
export default withRouter(connect(mapStateToProps)(Home));
