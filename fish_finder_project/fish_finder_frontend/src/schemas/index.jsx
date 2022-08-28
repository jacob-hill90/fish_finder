import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signupSchema = yup.object().shape({
    first_name: yup.string().min(3, "First name must be at least 3 characters long").required("Required"),
    last_name: yup.string().min(3, "Last name must be at least 3 characters long").required("Required"),
    username: yup.string()
        .min(8, "Must be at least 8 characters")
        .max(20, "Must be less  than 20 characters")
        .required("Required")
        .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
    zipcode: yup.string().min(5, "Zipcode must be atleast 5 numbers long").required("Required"),
    state: yup
        .string()
        .oneOf(['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
        'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
        'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
        'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX',
        'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'], "Invalid state or territory input")
        .required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(8).matches(passwordRules, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "passwords must match").required("Required"),
    accept: yup.boolean().oneOf([true], "Please accept the terms of service"),
}); 