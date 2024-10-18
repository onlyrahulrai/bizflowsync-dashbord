import axiosInstance from "api/base";
import { USER_LOADED } from "constants/types";
import Cookies from 'js-cookie';

export const login = ({ username, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ username, password });

    return new Promise(async (resolve, reject) => {
        await axiosInstance.post(`/auth/login/`, body, config)
            .then((response) => {
                resolve({ response, dispatch });
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const loadUserDetails = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axiosInstance.get(`/auth/user-details/`)
            .then((response) => {
                resolve({ response, dispatch })
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const logout = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            Cookies.remove('token')

            dispatch({
                type: USER_LOADED
            });

            resolve();
        } catch (error) {
            reject("Couldn't logout user")
        }
    })
}

export const regenerateOtp = ({ email, mode }) => (_) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            params: {
                email,
                mode
            }
        }

        await axiosInstance.get(`/auth/regenerate-otp/`, config)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const verifyOtp = (values) => async (_) => {
    return new Promise(async (resolve, reject) => {
        await axiosInstance.post(`/auth/verify-otp/`, values)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const setNewPassword = (values) => async (_) => {
    return new Promise(async (resolve, reject) => {
        await axiosInstance.put(`/auth/reset-password/`, values)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const register = (values) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axiosInstance.post(`/auth/register/`, values)
            .then((response) => {
                resolve({response, dispatch})
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const verifyAccount = (values) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axiosInstance.post(`/auth/verify-account/`, values)
            .then((response) => {
                resolve({ response, dispatch })
            })
            .catch((error) => {
                reject(error);
            })
    })
}