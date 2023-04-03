import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/contact.context";
import { UserContext } from "../../contexts/user.context";
import { instace } from "../../services/api";

const ModalDeleteContact = () => {
  const { contact, setContact, setModalDeleteContact } =
    useContext(ContactContext);
  const { setContactsList, contactsList } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callDeleteContact = async () => {
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

      setContactsList(newContactsList);
      setContact(null);
      setModalDeleteContact(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDisable(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Deseja deletar esse contato?</h2>
        </div>
        <div>
          <button onClick={() => setModalDeleteContact(false)}>Não</button>
          <button onClick={() => callDeleteContact()} disabled={disable}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteContact;
