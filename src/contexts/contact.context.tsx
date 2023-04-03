import { createContext, SetStateAction, useState } from "react";
import { IContact, IProvidersProps } from "./user.context";

interface IContactProvider {
  modalUpdateUser: boolean;
  modalCreateContact: boolean;
  modalUpdateContact: boolean;
  contact: IContact | null;
  setModalUpdateUser: React.Dispatch<SetStateAction<boolean>>;
  setModalCreateContact: React.Dispatch<SetStateAction<boolean>>;
  setModalUpdateContact: React.Dispatch<SetStateAction<boolean>>;
  setContact: React.Dispatch<SetStateAction<IContact | null>>;
}

export const ContactContext = createContext<IContactProvider>(
  {} as IContactProvider
);

const ContactProvider = ({ children }: IProvidersProps) => {
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalCreateContact, setModalCreateContact] = useState(false);
  const [modalUpdateContact, setModalUpdateContact] = useState(false);
  const [contact, setContact] = useState<IContact | null>(null);

  return (
    <ContactContext.Provider
      value={{
        modalUpdateUser,
        modalCreateContact,
        modalUpdateContact,
        contact,
        setModalUpdateUser,
        setModalCreateContact,
        setModalUpdateContact,
        setContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
