// Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Segment, Menu, Image, Button } from "semantic-ui-react";
import { logout, login } from "../store/actions/authedUser.action";

// Main Class
class Header extends Component {
  state = { activeItem: "dashboard" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logout());
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Segment>
        <Menu
          style={{ marginLeft: "15%", width: "70%" }}
          attached="top"
          tabular
        >
          <Menu.Item
            name="Dashboard"
            as={NavLink}
            to="/"
            exact
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
            className={"menuItem"}
          />
          <Menu.Item
            name="New Question"
            as={NavLink}
            to="/add"
            exact
            active={activeItem === "new"}
            onClick={this.handleItemClick}
            className={"menuItem"}
          />
          <Menu.Item
            name="Leader Board"
            as={NavLink}
            to="/leaderboard"
            exact
            active={activeItem === "leader"}
            onClick={this.handleItemClick}
            className={"menuItem"}
          />
          <Menu.Menu position="right">
            <Menu.Item style={{ marginRight: "5px" }}>
              {this.props.activeUser
                ? " Hello, " + this.props.activeUser.name + " "
                : null}

              {this.props.activeUser ? (
                <Image
                  src={this.props.activeUser.avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
              ) : null}
              {this.props.authedUser ? (
                <Button
                  labelPosition="right"
                  basic
                  compact
                  size="mini"
                  onClick={this.handleLogout}
                >
                  Log out
                </Button>
              ) : null}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const activeUser = users.filter((user) => user.id === authedUser)[0];
  return {
    activeUser,
    users,
  };
}

// Export
export default withRouter(connect(mapStateToProps)(Header));
