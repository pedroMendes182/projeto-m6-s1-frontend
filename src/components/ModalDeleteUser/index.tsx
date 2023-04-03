import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { instace } from "../../services/api";

const ModalDeleteUser = () => {
  const { setUser, setModalDeleteUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const callDeleteUser = async () => {
    try {
      setDisable(true);
      const token = window.localStorage.getItem("@KAtoken");
      const id = window.localStorage.getItem("@KAuuid");
      await instace.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(null);
      setModalDeleteUser(false);
      window.localStorage.clear();
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
