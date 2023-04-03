import { SetStateAction, useContext } from "react";
import { Navigate } from "react-router-dom";
import ModalCreateContact from "../../components/ModalCreateContact";
import ModalUpdateContact from "../../components/ModalUpdateContact";
import ModalUpdateUser from "../../components/ModalUpdateUser";
import { ContactContext } from "../../contexts/contact.context";
import { UserContext } from "../../contexts/user.context";

export interface IModalProps {
  closeModal(setModal: React.Dispatch<SetStateAction<boolean>>): void;
}

const DashBoard = () => {
  const { isLoading, navigate, user, contactsList } = useContext(UserContext);
  const {
    modalCreateContact,
    modalUpdateContact,
    modalUpdateUser,
    setModalUpdateUser,
  } = useContext(ContactContext);

  const logout = () => {
    window.localStorage.removeItem("@KAuuid");
    window.localStorage.removeItem("@KAtoken");
    navigate("/");
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
            <button>Deletar perfil</button>
            <button onClick={() => setModalUpdateUser(true)}>
              Editar perfil
            </button>
          </div>

          <h2>Contatos</h2>

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
                  <button>Deletar contato</button>
                  <button>Editar contato</button>
                </li>
              );
            })}
          </ul>
          {modalUpdateUser && <ModalUpdateUser closeModal={closeModal} />}
          {modalCreateContact && <ModalCreateContact closeModal={closeModal} />}
          {modalUpdateContact && <ModalUpdateContact closeModal={closeModal} />}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default DashBoard;
