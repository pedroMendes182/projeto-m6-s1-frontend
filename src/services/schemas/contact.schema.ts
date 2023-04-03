import * as yup from "yup";

export const updateContactSchema = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().nullable().email("digite um e-mail valido"),
  phone: yup
    .string()
    .nullable()
    .when({
      is: (value: string) => value,
      then: yup
        .string()
        .matches(/\(\d{2}\)\s\d{5}-\d{4}/, "número de celular inválido"),
    }),
});
