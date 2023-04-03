import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Este campo é obrigatorio")
    .email("Digite um e-mail valido"),
  password: yup.string().required("Este campo é obrigatorio"),
});
