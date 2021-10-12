import React, { useState, Fragment } from "react";
import { Segment, Button, Label, Icon, Progress } from "semantic-ui-react";
import { Grid, Image, Header, Form, Radio } from "semantic-ui-react";
function UnansweredQusetion({
  user,
  question,
  onSubmit,
  onChange,
  value,
  optionOne,
  optionTwo,
  opt1Percentage,
  opt2Percentage,
  author,
}) {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={author.avatarURL} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header as="h3">{`${author.name} Asks:`}</Header>
          <Fragment>
            <Header as="h2">Would you rather</Header>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <Radio
                  label={question.optionOne.text}
                  name="radioGroup"
                  value="optionOne"
                  checked={value === "optionOne"}
                  onChange={onChange}
                />
                <br />
                <Radio
                  label={question.optionTwo.text}
                  name="radioGroup"
                  value="optionTwo"
                  checked={value === "optionTwo"}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <Button
                  color="teal"
                  size="tiny"
                  fluid
                  onSubmit={onSubmit}
                  content="Submit"
                />
              </Form.Field>
            </Form>
          </Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default UnansweredQusetion;
