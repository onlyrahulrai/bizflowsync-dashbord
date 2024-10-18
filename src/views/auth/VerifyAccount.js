import { Button, notification, Spin } from 'antd';
import { regenerateOtp } from 'api/actions/auth';
import { verifyAccount } from 'api/actions/auth';
import { USER_LOADED } from 'constants/types';
import { Formik } from 'formik';
import { otpValidate } from 'helper/validate';
import Cookies from 'js-cookie';
import React, { Component } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class VerifyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countDown: 60,
            loading: false,
            isResendingOtp: false,
            token: null
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.countDown > 0) {
                this.setState((prevState) => ({
                    countDown: prevState.countDown - 1,
                }));
            }
        }, 1000);

        if (!this.props.location.state) {
            this.props.history.push("/auth/login")
        } else {
            const { token } = this.props.location.state;
            if (token) {
                this.setState({ token })
            }
        }


    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onResendOTP = () => {
        this.setState({ isResendingOtp: true });

        const { email } = this.props.location.state;

        this.props.regenerateOtp({ email, mode: "registration" })
            .then((response) => {
                this.setState({
                    countDown: 60,
                    isResendingOtp: false,
                    token: response.data.token
                })
            })
            .catch((error) => {
                this.setState({ isResendingOtp: false }, () => {
                    notification.error({
                        message: "Couldn't resend otp!"
                    })
                })
            })
    };

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
                                        Verify Account
                                    </h5>
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-center text-blueGray-500">
                                    Please enter the OTP sent {"\n"} to your registered mobile number or email address
                                </p>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                <Formik
                                    initialValues={{ code: '' }}
                                    validate={otpValidate}
                                    validateOnBlur={false}
                                    validateOnChange={false}
                                    onSubmit={(values) => {
                                        this.setState({ loading: true })

                                        const token = this.state.token;

                                        Object.assign(values, { token })

                                        this.props.verifyAccount(values)
                                            .then(({ response, dispatch }) => {
                                                this.setState({ loading: false }, () => {
                                                    const { access, refresh, ...rest } = response.data;

                                                    Cookies.set("token", JSON.stringify({ access, refresh }))

                                                    dispatch({
                                                        type: USER_LOADED,
                                                        payload: rest
                                                    })

                                                })
                                            })
                                            .catch((error) => {
                                                this.setState({ loading: false }, () => {
                                                    notification.error("Couldn't verify account");
                                                })
                                            })
                                    }}
                                >
                                    {
                                        (props) => (
                                            <form>
                                                <div className="relative w-full">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        OTP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder="OTP"
                                                        value={props.values.code}
                                                        onChange={props.handleChange("code")}
                                                    />
                                                    {
                                                        props.errors.code ? (
                                                            <div className="text-right">
                                                                <span className="text-sm text-red-500">{props.errors.code}</span>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>

                                                <div className='text-right'>
                                                    {
                                                        this.state.countDown > 0 ? (
                                                            <span className='text-sm'>Resend OTP in {this.state.countDown} seconds</span>
                                                        ) : (
                                                            <span className='text-sm text-red-500 cursor-pointer' onClick={this.onResendOTP}>
                                                                {this.state.isResendingOtp ? <Spin size="small" /> : null} &nbsp; &nbsp;
                                                                Resend OTP
                                                            </span>
                                                        )
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
                                                        Verify
                                                    </Button>
                                                </div>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { verifyAccount, regenerateOtp })(VerifyAccount);