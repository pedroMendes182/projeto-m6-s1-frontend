import { SetStateAction, useContext } from "react";
import { Navigate } from "react-router-dom";
import ModalCreateContact from "../../components/ModalCreateContact";
import ModalDeleteContact from "../../components/ModalDeleteContact";
import ModalUpdateContact from "../../components/ModalUpdateContact";
import ModalUpdateUser from "../../components/ModalUpdateUser";
import { ContactContext } from "../../contexts/contact.context";
import { IContact, UserContext } from "../../contexts/user.context";
import ModalDeleteUser from "../../components/ModalDeleteUser";

export interface IModalProps {
  closeModal(setModal: React.Dispatch<SetStateAction<boolean>>): void;
}

const DashBoard = () => {
  const {
    isLoading,
    navigate,
    user,
    contactsList,
    modalDeleteUser,
    setModalDeleteUser,
  } = useContext(UserContext);
  const {
    modalCreateContact,
    modalUpdateContact,
    modalUpdateUser,
    modalDeleteContact,
    setModalUpdateUser,
    setModalUpdateContact,
    setModalCreateContact,
    setModalDeleteContact,
    setContact,
  } = useContext(ContactContext);

  const logout = () => {
    window.localStorage.removeItem("@KAuuid");
    window.localStorage.removeItem("@KAtoken");
    navigate("/");
  };

  const openUpdateModal = (contact: IContact) => {
    setContact(contact);
    setModalUpdateContact(true);
  };

  const openDeleteModal = (contact: IContact) => {
    setContact(contact);
    setModalDeleteContact(true);
  };

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  const closeModal = (setModal: React.Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  return (
    <>
      {user ? (
        <>
          <div>
            <button onClick={() => logout()}>Sair</button>
            <h1>Dados do Usuario</h1>
            <p>Nome: {user.name}</p>
            <p>E-mail: {user.email}</p>
            <p>Celular: {user.phone}</p>
            <p>
              Membro desde:{" "}
              {(user.createdAt + "").slice(0, 9).split("-").reverse().join("/")}
            </p>
            <button onClick={() => setModalDeleteUser(true)}>
              Deletar perfil
            </button>
            <button onClick={() => setModalUpdateUser(true)}>
              Editar perfil
            </button>
          </div>

          <h2>Contatos</h2>

          <button onClick={() => setModalCreateContact(true)}>
            Criar novo contato
          </button>

          <ul>
            {contactsList?.map((contact) => {
              return (
                <li key={contact.id}>
                  <p>Nome: {contact.name}</p>
                  <p>E-mail: {contact.email}</p>
                  <p>Celular: {contact.phone}</p>
                  <p>
                    Membro desde:{" "}
                    {(contact.createdAt + "")
                      .slice(0, 9)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                  <button onClick={() => openDeleteModal(contact)}>
                    Deletar contato
                  </button>
                  <button onClick={() => openUpdateModal(contact)}>
                    Editar contato
                  </button>
                </li>
              );
            })}
          </ul>
          {modalUpdateUser && <ModalUpdateUser closeModal={closeModal} />}
          {modalCreateContact && <ModalCreateContact closeModal={closeModal} />}
          {modalUpdateContact && <ModalUpdateContact closeModal={closeModal} />}
          {modalDeleteContact && <ModalDeleteContact />}
          {modalDeleteUser && <ModalDeleteUser />}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default DashBoard;
