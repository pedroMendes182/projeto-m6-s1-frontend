import { yupResolver } from "@hookform/resolvers/yup";
import { IModalProps } from "../../pages/Dashboard";
import { useForm } from "react-hook-form";
import { updateContactSchema } from "../../services/schemas/contact.schema";
import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/contact.context";
import InputMask from "react-input-mask";
import { formatedDataforRequest } from "../ModalUpdateUser";
import { UserContext } from "../../contexts/user.context";
import { instace } from "../../services/api";

export interface IContactUpdate {
  name?: string | null;
  email?: string | null;
  newPhone?: string | null;
}

const ModalUpdateContact = ({ closeModal }: IModalProps) => {
  const { setModalUpdateContact, contact, setContact } =
    useContext(ContactContext);
  const { setContactsList, contactsList } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callUpdateContact = async (data: IContactUpdate) => {
    let updateData = formatedDataforRequest(data);
    if (data.newPhone) {
      const phone = parseInt(data.newPhone.replace(/[()\-\s]/g, ""));
      updateData = {
        ...updateData,
        phone: phone,
      };
    }
    try {
      setDisable(true);
      const token = window.localStorage.getItem("@KAtoken");
      const { data } = await instace.patch(
        `users/contacts/${contact?.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newContactsList = contactsList.filter(
        (ctc) => ctc.id !== contact?.id
      );

      setContactsList([...newContactsList, data]);
      setContact(null);
      setModalUpdateContact(false);
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
  } = useForm<IContactUpdate>({
    resolver: yupResolver(updateContactSchema),
  });

  return (
    <div style={{ backgroundColor: "#12121450" }}>
      <h2>Editar Contato: {contact?.name}</h2>
      <button onClick={() => setModalUpdateContact(false)}>X</button>
      <div>
        <form onSubmit={handleSubmit(callUpdateContact)}>
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

          <button type="submit" disabled={disable}>
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateContact;
