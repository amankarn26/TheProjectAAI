import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
    let errors = ""

    if (isEmpty(data.email)) {
        errors = "Email is Required";
    }

    else if (isEmpty(data.password)) {
        errors = "Password is Required";
    }

    else if (!Validator.isEmail(data.email)) {
        errors = "Please enter correct email Id";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}