import * as yup from 'yup'

export default yup.object().shape({
    primaryemail: yup
    .string()
    .email("Must be a valid email")
    .required("Please enter an email for registration"),
    username: yup
    .string()
    .required("Please enter a username")
    .min(3, "Username must be at least 3 characters long"),
    password: yup
    .string()
    .required("Please enter a password")
    .min(5, "Passord must be at least 5 characters long"),
})