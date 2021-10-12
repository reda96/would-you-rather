import React, { useState, useEffect, Fragment } from "react";
import { Divider, Grid, Image, Header, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAddQuestion } from "../store/actions/questions.actions";
function NewQusetion(props) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (submitted) {
      props.history.push("/");
    }
  }, [submitted, props.history]);
  useEffect(() => {
    if (optionOneText && optionTwoText) setDisabled(false);
  }, [optionOneText, optionTwoText]);

  const onChangeOptionOne = (e) => {
    setOptionOneText(e.target.value);
  };
  const onChangeOptionTwo = (e) => {
    setOptionTwoText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser } = props;
    dispatch(
      setAddQuestion({ optionOneText, optionTwoText, author: authedUser })
    ).then(() => {
      setOptionOneText("");
      setOptionTwoText("");
      setSubmitted(true);
      setDisabled(true);
    });
  };

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={props.activeUser.avatarURL} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header as="h3">{props.activeUser.name}: Create a new Poll</Header>
          <Fragment>
            <Header as="h2">Would you rather</Header>
            <Form onSubmit={onSubmit}>
              <Form.Input
                id="option1"
                placeholder="Enter option one..."
                value={optionOneText}
                onChange={onChangeOptionOne}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                placeholder="Enter option two..."
                value={optionTwoText}
                onChange={onChangeOptionTwo}
                required
              />
              <Form.Field>
                <Button
                  color="green"
                  size="tiny"
                  fluid
                  positive
                  disabled={disabled}
                >
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
function mapStateToProps({ users, authedUser }) {
  const activeUser = users.filter((u) => u.id === authedUser)[0];
  return { users, authedUser, activeUser };
}

// Export
export default connect(mapStateToProps)(NewQusetion);
