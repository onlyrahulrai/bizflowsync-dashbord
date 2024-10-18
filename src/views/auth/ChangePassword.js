import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { Formik } from 'formik';
import { changePasswordValidate } from 'helper/validate';
import { connect } from 'react-redux';
import { setNewPassword } from 'api/actions/auth';
import { Button, notification } from 'antd';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/auth/login")
    }
  }

  render() {
    return (
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <Link to="/auth/login">
                  <FaArrowLeft className="mb-8" />
                </Link>

                <div className="text-center">
                  <h5 className="text-blueGray-500 text-md font-bold">
                    Change Your Password
                  </h5>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-center text-blueGray-500">
                  Setup a strong password to keep secure <br /> your account. Your account's safety is our priority empower your digital presence with a password that stands guard against unauthorized access.

                </p>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={{
                    new_password: "",
                    confirm_password: ""
                  }}
                  validate={changePasswordValidate}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={(values) => {
                    this.setState({ loading: true })

                    const token = this.props.location?.state?.token;

                    this.props.setNewPassword({ password: values?.new_password, token })
                      .then((response) => {
                        this.setState({ loading: false }, () => {
                          this.props.history.push("/auth/login", response.data);
                        })
                      })
                      .catch((error) => {
                        this.setState({ loading: false }, () => {
                          notification.error("Couldn't change password");
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
                            New Password
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="New Password"
                            value={props.values.new_password}
                            onChange={props.handleChange("new_password")}
                          />
                          {
                            props.errors.new_password ? (
                              <div className="text-right">
                                <span className="text-sm text-red-500">{props.errors.new_password}</span>
                              </div>
                            ) : null
                          }
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="text"
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

                        <div className="text-center mt-6">
                          <Button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={props.handleSubmit}
                            disabled={this.state.loading}
                            loading={this.state.loading}
                          >
                            Save
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
    )
  }
}

export default connect(null, { setNewPassword })(ChangePassword);