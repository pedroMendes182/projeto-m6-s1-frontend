import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../services/schemas/login.schema";
import { ILogin, UserContext } from "../../contexts/user.context";

const HomePage = () => {
  const { login } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callLogin = (data: ILogin) => {
    login(data, setDisable);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <div>
        <h1>KAContacts</h1>
      </div>
      <form onSubmit={handleSubmit(callLogin)}>
        <h2>Login</h2>

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

        <button type="submit" disabled={disable}>
          Entrar
        </button>
      </form>

      <p>Ainda não possui uma conta?</p>

      <Link to="/register">Cadastre-se</Link>
    </>
  );
};

export default HomePage;
