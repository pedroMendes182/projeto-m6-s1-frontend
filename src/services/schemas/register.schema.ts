import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("esse campo é obrigatorio"),
  email: yup
    .string()
    .required("esse campo é obrigatorio")
    .email("digite um e-mail valido"),
  phone: yup
    .string()
    .required("esse campo é obrigatorio")
    .matches(/\(\d{2}\)\s\d{5}-\d{4}/, "número de celular inválido"),
  password: yup.string().required("esse campo é obrigatorio"),
});
