import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { updateUserSchema } from "../../services/schemas/user.schema";
import InputMask from "react-input-mask";
import { UserContext } from "../../contexts/user.context";

export interface IUserUpdate {
  name?: string | null;
  email?: string | null;
  newPhone?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

//função recursiva para excluir chaves vazias do objeto
export const formatedDataforRequest = (obj: IUserUpdate) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (typeof v === "object" && v) {
        v = formatedDataforRequest(v);
      }
      return v;
    })
  );
};

const ModalUpdateUser = () => {
  const { setModalUpdateUser, updateUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callUpdateUser = async (data: IUserUpdate) => {
    updateUser(data, setDisable);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>({
    resolver: yupResolver(updateUserSchema),
  });

  return (
    <div style={{ backgroundColor: "#12121450" }}>
      <h2>Editar Dados do Usuario</h2>
      <button onClick={() => setModalUpdateUser(false)}>X</button>
      <div>
        <form onSubmit={handleSubmit(callUpdateUser)}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              defaultValue=""
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
              defaultValue=""
              placeholder="Digite seu nome..."
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>

          <div>
            <label htmlFor="phone">Celular</label>
            <InputMask
              id="phone"
              mask="(99) 99999-9999"
              defaultValue=""
              placeholder="Digite seu celular..."
              {...register("newPhone")}
            />
            <p>{errors.newPhone?.message}</p>
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <div>
              <input
                id="password"
                type="password"
                defaultValue=""
                placeholder="Digite sua senha..."
                {...register("newPassword")}
              />
            </div>
            <p>{errors.newPassword?.message}</p>
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              defaultValue=""
              placeholder="Digite sua senha novamente"
              {...register("confirmPassword")}
            />
            <p>{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" disabled={disable}>
            {disable ? "Atualizando..." : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateUser;
