import { createContext, SetStateAction, useState } from "react";
import { IProvidersProps } from "./user.context";

interface IContactProvider {
  modalUpdateUser: boolean;
  modalCreateContact: boolean;
  modalUpdateContact: boolean;
  setModalUpdateUser: React.Dispatch<SetStateAction<boolean>>;
  setModalCreateContact: React.Dispatch<SetStateAction<boolean>>;
  setModalUpdateContact: React.Dispatch<SetStateAction<boolean>>;
}

export const ContactContext = createContext<IContactProvider>(
  {} as IContactProvider
);

const ContactProvider = ({ children }: IProvidersProps) => {
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalCreateContact, setModalCreateContact] = useState(false);
  const [modalUpdateContact, setModalUpdateContact] = useState(false);

  return (
    <ContactContext.Provider
      value={{
        modalUpdateUser,
        modalCreateContact,
        modalUpdateContact,
        setModalUpdateUser,
        setModalCreateContact,
        setModalUpdateContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
