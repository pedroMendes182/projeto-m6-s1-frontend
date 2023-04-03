import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../services/schemas/user.schema";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { IRegister, UserContext } from "../../contexts/user.context";

export interface IRegisterMasked {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callRegister = (data: IRegisterMasked) => {
    const phone = parseInt(data.phone.replace(/[()\-\s]/g, ""));
    const dataFormatted: IRegister = {
      ...data,
      phone: phone,
    };
    registerUser(dataFormatted, setDisable);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterMasked>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <>
      <div>
        <h1>KAContacts</h1>
        <Link to="/">Voltar</Link>
      </div>
      <form onSubmit={handleSubmit(callRegister)}>
        <h2>Cadastre-se</h2>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email..."
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="name"
            placeholder="Digite seu celular..."
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="phone">Celular</label>
          <InputMask
            id="phone"
            mask="(99) 99999-9999"
            placeholder="digite seu celular..."
            {...register("phone")}
          />
          <p>{errors.phone?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha..."
              {...register("password")}
            />
          </div>
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Digite sua senha novamente"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit" disabled={disable}>
          {disable ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </>
  );
};

export default Register;
