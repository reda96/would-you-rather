import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setAnswerQuestion } from "../store/actions/questions.actions";
import AnsweredQusetion from "./AnsweredQusetion";
import UnansweredQusetion from "./UnansweredQuestion";
import { Label } from "semantic-ui-react";
import { Redirect } from "react-router";
function Question(props) {
  const [value, setvalue] = useState("");

  const onChange = (e, { value }) => setvalue(value);

  const onSubmit = () => {
    let id = props.match.params["question_id"];

    const { questions, authedUser, users, dispatch } = props;
    const question = questions.filter((q) => q.id === id)[0];
    dispatch(
      setAnswerQuestion({
        authedUser,
        qid: question.id,
        answer: value,
      })
    );
  };

  let id = props.match.params["question_id"];
  const { questions, authedUser, users } = props;
  const question = questions.filter((q) => q.id === id)[0];
  if (!question) return <Redirect to="/404" />;
  const user = users.filter((u) => u.id === authedUser)[0];
  const author = users.filter((u) => u.id === question.author)[0];
  const answer = user.answers[id];
  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const opt1Votes = question.optionOne.votes.length;
  const opt2Votes = question.optionTwo.votes.length;
  const totalVotes = opt1Votes + opt2Votes;
  const opt1Percentage = Math.round((opt1Votes / totalVotes) * 100);
  const opt2Percentage = Math.round((opt2Votes / totalVotes) * 100);

  return question ? (
    answer ? (
      <AnsweredQusetion
        user={user}
        author={author}
        id={id}
        question={question}
        optionOne={optionOne}
        optionTwo={optionTwo}
        opt1Percentage={opt1Percentage}
        opt2Percentage={opt2Percentage}
        opt1Votes={opt1Votes}
        opt2Votes={opt2Votes}
        totalVotes={totalVotes}
        history={props.history}
      />
    ) : (
      <UnansweredQusetion
        user={user}
        author={author}
        id={id}
        question={question}
        onSubmit={onSubmit}
        onChange={onChange}
        value={value}
        optionOne={optionOne}
        optionTwo={optionTwo}
        opt1Percentage={opt1Percentage}
        opt2Percentage={opt2Percentage}
        totalVotes={totalVotes}
      />
    )
  ) : (
    <Label>Sorry, This Question does not Exist</Label>
  );
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    users,
    authedUser,
    questions,
  };
}

// Export
export default connect(mapStateToProps)(Question);
