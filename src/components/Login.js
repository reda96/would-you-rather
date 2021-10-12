// Imports
import React, { useEffect, useState } from "react";
import { Segment, Image, Form, Label } from "semantic-ui-react";
import { login } from "../store/actions/authedUser.action";
import { connect } from "react-redux";

// Main Class
function Login(props) {
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    if (props.authedUser) {
      if (props.location.path) {
        props.history.push(props.location.state.from.pathname);
      } else {
        props.history.push("/");
      }
    }
  }, [props.authedUser, props.history, props.location.path]);

  const onChange = (e, { value }) => {
    setActiveUser(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.dispatch(login(activeUser));
  };

  const selectOptions = () => {
    const { users } = props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: user.avatarURL,
    }));
  };

  return (
    <Segment>
      <Label
        style={{
          textAlign: "center",
          width: "100%",
          backgroundColor: "lightGray",
        }}
      >
        <h2>Welocome to the would you rather app! </h2>
        <p style={{ color: "#333" }}>Please sign in to continue</p>
      </Label>
      <Form onSubmit={onSubmit}>
        <Image
          style={{ marginLeft: "40%" }}
          src="https://i.ibb.co/XzcyqRF/logo.png"
          size="small"
        />
        <h1 style={{ color: "#00a39b", textAlign: "center" }}>Sign In</h1>
        <Form.Select
          placeholder="Select User Name"
          centered="true"
          scrolling
          required
          options={selectOptions()}
          value={activeUser}
          onChange={onChange}
        />

        <Form.Button
          type="submit"
          disabled={activeUser ? false : true}
          // onClick={this.onSubmit}
          className="signinBtn"
          style={{ width: "100%", backgroundColor: "#00a39b", color: "white" }}
        >
          Sign In
        </Form.Button>
      </Form>
    </Segment>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Login);
