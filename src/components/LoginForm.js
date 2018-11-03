import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: undefined,
      mdbreact: undefined
    }
  }

  componentDidMount() {
    this.setState({ window: window });
    try {
      const mdbreact = require("mdbreact");
      this.setState({ mdbreact: mdbreact });
    } catch (e) {
      console.error(e);
    }
  }

  render() {

    if (this.state.window) {

      return (

        <Grid>
          <Row>
            <Col md={4}>
              <form
                className="form-signin"
                method="post"
                onSubmit={event => {
                  event.preventDefault()
                  this.props.handleSubmit(event)
                  // history.push(`/app/dashboard `)
                }}
              >
                <p className="h5 text-center mb-4">Sign in</p>

                <input type="hidden" name="utf8" value="✓" />

                <div className={this.props.emailGroupClass}>
                  <label htmlFor="email">Type your email</label>
                  <input
                    id="formControlsEmail"
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={this.props.handleUpdate}
                    value={this.props.emailValue}
                  />
                  <span className="help-block">{this.props.emailMessage}</span>
                </div>

                <div className={this.props.passwordGroupClass}>
                  <label htmlFor="password">Type your password</label>
                  <input
                    id="formControlsPassword"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.props.handleUpdate}
                    value={this.props.passwordValue}
                  />
                  <span className="help-block">{this.props.passwordMessage}</span>
                </div>

                <Button type="submit">Submit</Button>

              </form>

            </Col>
          </Row>
        </Grid>
      )
    } else {
      return <span />
    }
  }
}