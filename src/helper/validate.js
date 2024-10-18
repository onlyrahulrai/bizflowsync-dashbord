import { authenticate, captalizeString } from "./utils";

// Validate Username 
export const usernameVerify = (errors = {}, values) => {
    if (!values.username) {
        errors.username = "Username is required!";
    } else if (values.username.includes(" ")) {
        errors.username = "Invalid Username...!";
    }

    return errors;
};

export const emailVerify = (errors = {}, values) => {
    if (!values.email) {
        errors.email = "Email is required!";
    } else if (values.email.includes(" ")) {
        errors.email = "Wrong Email...!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address...!";
    }

    return errors;
};

// Validate Password
export const passwordVerify = (errors = {}, values, key="password") => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values[key]) {
        errors[key] = `${captalizeString(key)} is required!`;
    } else if (values.password.includes(" ")) {
        errors.password = `${captalizeString(key)} is wrong!`;
    } else if (values.password.length < 4) {
        errors.password =
            `${captalizeString(key)} must be more than 4 characters long!`

    } else if (!specialChars.test(values.password)) {
        errors.password = `${captalizeString(key)} must have special character!`;
    }

    return errors;
};

// validate Mobile
export const mobileVerify = (errors = {}, values) => {
    const regexPattern = /^(\+91[\-\s]?)?[6789]\d{2}[\-\s]?\d{3}[\-\s]?\d{4}$/;

    if (!values.mobile) {
        errors.mobile = "Mobile is required!";
    }else{
        if (!regexPattern.test(values.mobile)) {
            errors.mobile = "Mobile isn't valid!";
        }
    }

    return errors;
};

// Validate Multiple Password
export const multiplePasswordVerify = (errors = { new_password: "", confirm_password: "", current_password: "" }, values, key) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const obj = {
        new_password: "New Password",
        confirm_password: "Confirm Password",
        current_password: "Current Password"
    }

    if (!values[key]) {
        errors[key] = `${obj[key]} is required!`;
    } else if (values[key]?.includes(" ")) {
        errors[key] = `${obj[key]} is wrong!`;
    } else if (values[key].length < 4) {
        errors[key] =
            `${obj[key]} must be more than 4 characters long!`

    } else if (!specialChars.test(values[key])) {
        errors[key] = `${obj[key]} must have special character!`;
    }

    return errors;
};

// Username or Email Verification
export const usernameValidate = async (values) => {
    let errors = null;

    if(values?.username?.includes("@")){
        const {username:email, password} = values;
        errors = emailVerify({}, {email, password})
    } else{
        errors = usernameVerify({}, values);
    }
    console.log("Errors: ", errors)

    if (values.username && (values?.username?.includes("@") ? !errors.email : !errors.username)) {
        const { status } = await authenticate(values.username);

        if (status !== 200) {
            errors.username = "User does not exist...!";
        }
    }

    return errors;
};


export const loginValidate = async (values) => {
    let errors = await usernameValidate(values);
    passwordVerify(errors, values);

    return errors;
};

export const resetPasswordValidate = (values) => {
    let errors = emailVerify({}, values);

    return errors;
}

export const otpValidate = (values) => {
    const errors = {};

    const otpPattern = /^\d{6}$/;

    if (!otpPattern.test(values.code)) {
        errors.code = "Invalid OTP. Please enter a 6-digit number.";
    }

    return errors;
}

export const changePasswordValidate = (values) => {
    const errors = multiplePasswordVerify({}, values, "new_password")
    multiplePasswordVerify(errors, values, "confirm_password")

    if(values?.new_password !== values?.confirm_password){
        errors.confirm_password = "Both Password didn't matched!"
    }

    return errors;
}

export const registerValidate = (values) => {
    let errors = usernameVerify({}, values);
    emailVerify(errors, values);
    mobileVerify(errors, values)
    passwordVerify(errors, values);
    passwordVerify(errors, values, 'confirm_password');

    if (!values?.firstName) {
        errors.firstName = "Firstname is required!"
    }

    if (!values?.lastName) {
        errors.lastName = "Lastname is required!"
    }

    if(!Object.keys(errors).includes("password") && !Object.keys(errors).includes("confirm_password") && values.password !== values.confirm_password){
        errors.confirm_password = "Both password is different!"
    }

    return errors;
};