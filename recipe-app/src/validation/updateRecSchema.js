import * as yup from 'yup'

export default yup.object().shape({
    name: yup
    .string()
    .required("Please state a name for your change"),
    source: yup
    .string(),
    instructions: yup
    .string()
    .required("Please state instructions in your change"),
    category: yup
    .string()
    .required("Please give your recipe a category"),
    ingredients: yup
    .string()
    .required("Please list ingredients separated by commas"),
})