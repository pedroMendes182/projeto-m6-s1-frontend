import { createContext, SetStateAction, useContext, useState } from "react";
import { toast } from "react-toastify";
import { IContactRequest } from "../components/ModalCreateContact";
import { IContactUpdate } from "../components/ModalUpdateContact";
import { formatedDataforRequest } from "../components/ModalUpdateUser";
import { instace } from "../services/api";
import { IContact, IProvidersProps, UserContext } from "./user.context";

interface IContactProvider {
  modalCreateContact: boolean;
  modalUpdateContact: boolean;
  modalDeleteContact: boolean;
  contact: IContact | null;

  setModalCreateContact: React.Dispatch<SetStateAction<boolean>>;
  setModalUpdateContact: React.Dispatch<SetStateAction<boolean>>;
  setModalDeleteContact: React.Dispatch<SetStateAction<boolean>>;
  setContact: React.Dispatch<SetStateAction<IContact | null>>;
  createContact(
    data: IContactRequest,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  updateContact(
    data: IContactUpdate,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  deleteContact(
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
}

export const ContactContext = createContext<IContactProvider>(
  {} as IContactProvider
);

const ContactProvider = ({ children }: IProvidersProps) => {
  const { contactsList, setContactsList } = useContext(UserContext);
  const [modalCreateContact, setModalCreateContact] = useState(false);
  const [modalUpdateContact, setModalUpdateContact] = useState(false);
  const [modalDeleteContact, setModalDeleteContact] = useState(false);
  const [contact, setContact] = useState<IContact | null>(null);

  const createContact = async (
    data: IContactRequest,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ) => {
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
      toast.success("Contato adicionado!", {
        autoClose: 3000,
        theme: "dark",
      });

      setContactsList([...contactsList, data]);
      setModalCreateContact(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setDisable(false);
    }
  };

  const deleteContact = async (
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setDisable(true);
      const token = window.localStorage.getItem("@KAtoken");
      await instace.delete(`users/contacts/${contact?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newContactsList = contactsList.filter(
        (ctc) => ctc.id !== contact?.id
      );

      toast.success("Contato deletado!", {
        autoClose: 3000,
        theme: "dark",
      });
      setContactsList(newContactsList);
      setContact(null);
      setModalDeleteContact(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setDisable(false);
    }
  };

  const updateContact = async (
    data: IContactUpdate,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ) => {
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

      toast.success("Contato atualizado!", {
        autoClose: 3000,
        theme: "dark",
      });

      setContactsList([...newContactsList, data]);
      setContact(null);
      setModalUpdateContact(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setDisable(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        modalCreateContact,
        modalUpdateContact,
        modalDeleteContact,
        contact,
        setModalCreateContact,
        setModalUpdateContact,
        setModalDeleteContact,
        setContact,
        createContact,
        deleteContact,
        updateContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
