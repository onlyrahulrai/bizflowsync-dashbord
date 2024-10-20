import React from "react";
import { Button, notification } from "antd";
import { login } from "api/actions/auth";
import { Formik } from "formik";
import { loginValidate } from "helper/validate";
import { Link } from "react-router-dom";
import { LOGIN_SUCCESS } from "constants/types";
import { connect } from "react-redux";
import Cookies from 'js-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialValues: { username: '', password: '' }
    }
  }

  componentDidMount() {
    if (this.props.location?.state) {
      this.setState({ 
        initialValues: { ...this.state.initialValues, username: this.props.location?.state?.username } 
      })
    }
  }

  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/github.svg").default}
                      />
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/google.svg").default}
                      />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Formik
                    initialValues={this.state.initialValues}
                    validate={loginValidate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      this.setState({ loading: true })

                      this.props.login(values)
                        .then(({ response, dispatch }) => {
                          this.setState({ loading: false }, () => {
                            const { access, refresh, ...rest } = response.data;

                            Cookies.set("token", JSON.stringify({ access, refresh }))

                            dispatch({
                              type: LOGIN_SUCCESS,
                              payload: rest
                            })
                          })
                        })
                        .catch((error) => {
                          this.setState({ loading: false }, () => {
                            notification.error("Couldn't loggedIn to the dashboard")
                          })
                        })
                    }}
                  >
                    {
                      (props) => (
                        <form>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Email or Username
                            </label>
                            <input
                              type="email"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Email"
                              value={props.values.username}
                              onChange={props.handleChange("username")}
                            />
                            {
                              (props.errors.username || props.errors?.email) ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.username || props.errors?.email}</span>
                                </div>
                              ) : null
                            }
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Password"
                              value={props.values.password}
                              onChange={props.handleChange("password")}
                            />
                            {
                              props.errors.password ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.password}</span>
                                </div>
                              ) : null
                            }
                          </div>
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="customCheckLogin"
                                type="checkbox"
                                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                              />
                              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                Remember me
                              </span>
                            </label>
                          </div>

                          <div className="text-center mt-6">
                            <Button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="submit"
                              onClick={props.handleSubmit}
                              disabled={this.state.loading}
                              loading={this.state.loading}
                            >
                              Sign In
                            </Button>
                          </div>
                        </form>
                      )
                    }
                  </Formik>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link
                    className="text-blueGray-200"
                    to="/auth/forget-password"
                  >
                    <small>Forgot password?</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-blueGray-200">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { login })(Login);