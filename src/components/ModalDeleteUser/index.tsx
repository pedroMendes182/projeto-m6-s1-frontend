import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";

const ModalDeleteUser = () => {
  const { setModalDeleteUser, deleteUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callDeleteUser = async () => {
    deleteUser(setDisable);
  };

  return (
    <div>
      <div>
        <div>
          <h2>Deseja deletar esse contato?</h2>
        </div>
        <div>
          <button onClick={() => setModalDeleteUser(false)}>Não</button>
          <button onClick={() => callDeleteUser()} disabled={disable}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
