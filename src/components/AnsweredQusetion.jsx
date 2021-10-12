import React, { Fragment } from "react";
import { Segment, Button, Icon, Progress } from "semantic-ui-react";
import { Grid, Image, Header } from "semantic-ui-react";
function AnsweredQusetion({
  user,
  question,
  id,
  optionOne,
  optionTwo,
  opt1Percentage,
  opt2Percentage,
  opt1Votes,
  opt2Votes,
  totalVotes,
  history,
  author,
}) {
  return (
    <Grid celled>
      <Grid.Row style={{ backgroundColor: "#e0e1e2" }}>
        <Header
          style={{ padding: "10px" }}
          as="h3"
        >{`Asked by ${author.name}`}</Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={author.avatarURL} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Fragment>
            <Header as="h2">Results: </Header>
            <Segment style={{ backgroundColor: "#baffc0" }}>
              {user.answers[id] === "optionOne" ? (
                <div style={{ width: "100%" }}>
                  <Icon
                    name="outline check circle"
                    size="big"
                    className="compact"
                    style={{ float: "right", color: "blue" }}
                  />
                </div>
              ) : null}
              <p style={{ fontWeight: "bold" }}>Would you rather {optionOne}</p>
              <Progress percent={opt1Percentage} progress color="green">
                {`${opt1Votes} out of ${totalVotes} Votes`}
              </Progress>
            </Segment>
            <Segment color="red" style={{ backgroundColor: "#ffe8ed" }}>
              {user.answers[id] === "optionTwo" ? (
                <div style={{ width: "100%" }}>
                  <Icon
                    name="outline check circle"
                    size="big"
                    className="compact"
                    style={{ float: "right", color: "blue" }}
                  />
                </div>
              ) : null}
              <p style={{ fontWeight: "bold" }}>Would you rather {optionTwo}</p>
              <Progress percent={opt2Percentage} progress>
                {`${opt2Votes} out of ${totalVotes} Votes`}
              </Progress>
            </Segment>
            <Button
              size="tiny"
              floated="right"
              onClick={() => history.push("/")}
            >
              Back
            </Button>
          </Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default AnsweredQusetion;
