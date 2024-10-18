import React, { Component } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Button, notification } from 'antd';
import { connect } from 'react-redux';
import { regenerateOtp } from 'api/actions/auth';
import { resetPasswordValidate } from 'helper/validate';
import { Formik } from 'formik';


class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
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
                    Reset your password
                  </h5>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-center text-blueGray-500">
                  To reset your password, enter your email <br /> below and submit. An email will be sent to you with instructions about how to complete the process.
                </p>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {
                  <Formik
                    initialValues={{ email: '' }}
                    validate={resetPasswordValidate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values) => {
                      this.setState({ loading: true })

                      Object.assign(values, { mode: "reset" })

                      this.props.regenerateOtp(values)
                        .then((response) => {
                          this.setState({ loading: false }, () => {
                            this.props.history.push("/auth/verify-otp", { token: response.data.token, email: values.email });
                          })
                        })
                        .catch((error) => {
                          this.setState({ loading: false }, () => {
                            notification.error("Couldn't forgot password")
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
                              (props.errors?.email) ? (
                                <div className="text-right">
                                  <span className="text-sm text-red-500">{props.errors?.email}</span>
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
                              Submit
                            </Button>
                          </div>
                        </form>
                      )
                    }
                  </Formik>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { regenerateOtp })(ForgetPassword);