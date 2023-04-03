import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { ContactContext } from "../../contexts/contact.context";
import { UserContext } from "../../contexts/user.context";
import { IModalProps } from "../../pages/Dashboard";
import { instace } from "../../services/api";
import { createContactSchema } from "../../services/schemas/contact.schema";

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

const ModalCreateContact = ({ closeModal }: IModalProps) => {
  const { setContactsList, contactsList } = useContext(UserContext);
  const { setModalCreateContact } = useContext(ContactContext);
  const [disable, setDisable] = useState(false);

  const callCreateContact = async (data: IContactRequest) => {
    const phone = parseInt(data.phone.replace(/[()\-\s]/g, ""));
    const createData = {
      ...data,
      phone: phone,
    };
    try {
      setDisable(true);
      const token = window.localStorage.getItem("@KAtoken");
      const { data } = await instace.post("users/contacts", createData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactsList([...contactsList, data]);
      setModalCreateContact(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDisable(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactRequest>({
    resolver: yupResolver(createContactSchema),
  });

  return (
    <div style={{ backgroundColor: "#12121450" }}>
      <h2>Adicionar Contato</h2>
      <button onClick={() => setModalCreateContact(false)}>X</button>
      <div>
        <form onSubmit={handleSubmit(callCreateContact)}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              defaultValue=""
              placeholder="Digite o e-mail do contato..."
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
              placeholder="Digite o nome do contato..."
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
              placeholder="digite o celular do contato ..."
              {...register("phone")}
            />
            <p>{errors.phone?.message}</p>
          </div>

          <button type="submit" disabled={disable}>
            criar contato
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateContact;
