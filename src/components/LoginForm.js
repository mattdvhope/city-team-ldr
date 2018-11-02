import React, { Component } from "react"
import { withRouter } from "react-router-dom"

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: undefined,
    }
  }

  componentDidMount() {
    this.setState({ window: window });
  }

  render() {

    if (this.state.window) {
      return (

        <div className="container">
          <div className="row">
            <Col md="6">

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
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={this.props.handleUpdate}
                    value={this.props.emailValue}
                    autoFocus
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

                <button className="btn btn-success" type="submit">Submit</button>

              </form>

            </Col>
          </div>
        </div>
      )
    } else {
      return <span />
    }
  }
}