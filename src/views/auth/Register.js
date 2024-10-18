import { Button, notification } from "antd";
import { register } from "api/actions/auth";
import { Formik } from "formik";
import { registerValidate } from "helper/validate";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialValues: {
        firstName: "",
        lastName: "",
        username: "",
        mobile: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "Admin"
      }
    }
  }


  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <Link to="/auth/login">
                    <FaArrowLeft className="mb-12" />
                  </Link>

                  <div className="text-center mb-3 mt-6">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign up with
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
                    <small>Or sign up with credentials</small>
                  </div>
                  <Formik
                    initialValues={this.state.initialValues}
                    validate={registerValidate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values) => {
                      this.setState({ loading: true });

                      this.props.register(values)
                        .then(({ response, dispatch }) => {
                          this.setState({ loading: false }, () => {
                            const { token } = response.data;
                            this.props.history.push("/auth/verify-account", { token, email: values.email })
                          })
                        })
                        .catch((error) => {
                          this.setState({ loading: false }, () => {
                            notification.error("Couldn't create an account")
                          })
                        })
                    }}
                  >
                    {
                      (props) => (
                        <form>
                          <div className="flex w-full" style={{ gap: "12px" }}>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="first-name"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="First Name"
                                value={props.values.firstName}
                                onChange={props.handleChange("firstName")}
                              />
                              {
                                props.errors.firstName ? (
                                  <div className="text-right">
                                    <span className="text-sm text-red-500">{props.errors.firstName}</span>
                                  </div>
                                ) : null
                              }
                            </div>

                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="last-name"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Last Name"
                                value={props.values.lastName}
                                onChange={props.handleChange("lastName")}
                              />
                              {
                                props.errors.lastName ? (
                                  <div className="text-right">
                                    <span className="text-sm text-red-500">{props.errors.lastName}</span>
                                  </div>
                                ) : null
                              }
                            </div>
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Email"
                              value={props.values.email}
                              onChange={props.handleChange("email")}
                            />
                            {
                              props.errors.email ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.email}</span>
                                </div>
                              ) : null
                            }
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Username"
                              value={props.values.username}
                              onChange={props.handleChange("username")}
                            />
                            {
                              props.errors.username ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.username}</span>
                                </div>
                              ) : null
                            }
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="mobile"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Mobile"
                              value={props.values.mobile}
                              onChange={props.handleChange("mobile")}
                            />
                            {
                              props.errors.mobile ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.mobile}</span>
                                </div>
                              ) : null
                            }
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="password"
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

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="confirm-password"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Confirm Password"
                              value={props.values.confirm_password}
                              onChange={props.handleChange("confirm_password")}
                            />
                            {
                              props.errors.confirm_password ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors.confirm_password}</span>
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
                                I agree with the{" "}
                                <a
                                  href="#pablo"
                                  className="text-lightBlue-500"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>

                          <div className="text-center mt-6">
                            <Button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="button"
                              onClick={props.handleSubmit}
                              disabled={this.state.loading}
                              loading={this.state.loading}
                            >
                              Create Account
                            </Button>
                          </div>
                        </form>
                      )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { register })(Register);