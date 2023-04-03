import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/contact.context";
import { IModalProps } from "../../pages/Dashboard";
import { updateUserSchema } from "../../services/schemas/user.schema";
import InputMask from "react-input-mask";
import { instace } from "../../services/api";
import { UserContext } from "../../contexts/user.context";

export interface IUserUpdate {
  name?: string | null;
  email?: string | null;
  newPhone?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

const ModalUpdateUser = ({ closeModal }: IModalProps) => {
  const { setModalUpdateUser } = useContext(ContactContext);
  const { setUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  //função recursiva para excluir chaves vazias do objeto
  const formatedDataforRequest = (obj: IUserUpdate) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => {
        if (typeof v === "object" && v) {
          v = formatedDataforRequest(v);
        }
        return v;
      })
    );
  };

  const callUpdate = async (data: IUserUpdate) => {
    const updateData = formatedDataforRequest(data);
    try {
      setDisable(true);
      const id = window.localStorage.getItem("@KAuuid");
      const token = window.localStorage.getItem("@KAtoken");
      const { data } = await instace.patch(`users/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setModalUpdateUser(false);
    } catch (err) {
      console.error(err);
    } finally {
      setDisable(false);
    }
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
        <form onSubmit={handleSubmit(callUpdate)}>
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
              defaultValue=""
              placeholder="digite seu celular..."
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
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateUser;
