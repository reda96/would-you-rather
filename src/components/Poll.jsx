// imports
import React, { Fragment } from "react";
import { Grid, Image, Header, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
function Poll(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    const { id } = props.question;
    props.history.push(`/questions/${id}`);
  };

  const ques = props.question;
  const { author } = ques;
  const btnContent = "View Poll";
  const user = props.users.filter((user) => user.id === author);
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={user[0].avatarURL} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header as="h3">{`${user[0].name} Asks:`}</Header>
          <Fragment>
            <Header as="h2" style={{ fontWeight: "bold" }}>
              Would you rather
            </Header>
            <Form onSubmit={onSubmit}>
              <p>...{props.question.optionOne.text}</p>
              <Form.Field>
                <Button
                  size="tiny"
                  fluid
                  basic
                  color="teal"
                  content={btnContent}
                />
              </Form.Field>
            </Form>
          </Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function mapStateToProps(state) {
  return { users: state.users };
}

// Export
export default withRouter(connect(mapStateToProps)(Poll));
