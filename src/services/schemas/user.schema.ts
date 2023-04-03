import * as yup from "yup";
import { IUserUpdate } from "../../components/ModalUpdateUser";
import { IRegisterMasked } from "../../pages/Register";

export const registerSchema: yup.SchemaOf<IRegisterMasked> = yup
  .object()
  .shape({
    name: yup.string().required("este campo é obrigatorio"),
    email: yup.string().required().email("digite um e-mail valido"),
    phone: yup
      .string()
      .required()
      .matches(/\(\d{2}\)\s\d{5}-\d{4}/, "número de celular inválido"),
    password: yup
      .string()
      .required("este campo é obrigatorio")
      .matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
      .matches(/[a-z]/, "deve conter ao menos 1 letra minuscula")
      .matches(/(\d)/, "deve conter ao menos um número")
      .matches(/(\W)|_/, "deve conter um caracter especial")
      .matches(/.{8,}/, "deve ter no minimo 8 digitos"),
    confirmPassword: yup
      .string()
      .required("este campo é obrigatorio")
      .oneOf([yup.ref("password")], "as senhas devem ser iguais!"),
  });

export const updateUserSchema: yup.SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().nullable().email("digite um e-mail valido"),
  newPhone: yup
    .string()
    .nullable()
    .when({
      is: (value: string) => value,
      then: yup
        .string()
        .matches(/\(\d{2}\)\s\d{5}-\d{4}/, "número de celular inválido"),
    }),
  newPassword: yup
    .string()
    .nullable()
    .when({
      is: (value: string) => value,
      then: yup
        .string()
        .matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
        .matches(/[a-z]/, "deve conter ao menos 1 letra minuscula")
        .matches(/(\d)/, "deve conter ao menos um número")
        .matches(/(\W)|_/, "deve conter um caracter especial")
        .matches(/.{8,}/, "deve ter no minimo 8 digitos"),
    }),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("newPassword")], "as senhas devem ser iguais!"),
});
