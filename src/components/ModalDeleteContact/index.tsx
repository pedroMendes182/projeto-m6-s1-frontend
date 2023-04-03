import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/contact.context";

const ModalDeleteContact = () => {
  const { deleteContact, setModalDeleteContact } = useContext(ContactContext);
  const [disable, setDisable] = useState(false);

  const callDeleteContact = () => {
    deleteContact(setDisable);
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
