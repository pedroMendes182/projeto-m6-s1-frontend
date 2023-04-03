import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { To, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  formatedDataforRequest,
  IUserUpdate,
} from "../components/ModalUpdateUser";
import { instace } from "../services/api";

interface IUseNavigate {
  (to: To): void;
  options?: {
    replace?: boolean;
  };
}

interface IUserLoginResponse {
  token: string;
  uuid: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  contacts: IContact[];
}

interface IUserResponse {
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface IProvidersProps {
  children: ReactNode;
}

interface IUserProvider {
  user: IUser | null;
  contactsList: IContact[];
  isLoading: boolean;
  modalDeleteUser: boolean;
  modalUpdateUser: boolean;
  setModalDeleteUser: React.Dispatch<SetStateAction<boolean>>;
  setModalUpdateUser: React.Dispatch<SetStateAction<boolean>>;
  login(
    dataReq: ILogin,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  registerUser(
    data: IRegister,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  updateUser(
    data: IUserUpdate,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  deleteUser(
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  navigate: IUseNavigate;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
  setContactsList: React.Dispatch<SetStateAction<IContact[]>>;
}

export const UserContext = createContext<IUserProvider>({} as IUserProvider);

const UserProvider = ({ children }: IProvidersProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [contactsList, setContactsList] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem("@KAtoken");
      const id = window.localStorage.getItem("@KAuuid");
      if (token) {
        setIsLoading(true);
        try {
          const { data } = await instace.get<IUserResponse>(`users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(data.user);
          setContactsList(data.user.contacts);
        } catch (error) {
          console.error(error);
          window.localStorage.clear();
        } finally {
          setIsLoading(false);
        }
      }
    };

    autoLogin();
  }, []);

  useEffect(() => {
    const redirect = () => {
      const token = window.localStorage.getItem("@KAtoken");
      if (token) {
        navigate("/dashboard");
      }
    };

    redirect();
  }, [navigate]);

  const login = async (
    dataReq: ILogin,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void> => {
    try {
      setDisable(true);

      const { data } = await instace.post<IUserLoginResponse>("login", dataReq);

      window.localStorage.setItem("@KAtoken", data.token);
      window.localStorage.setItem("@KAuuid", data.uuid);

      const response = await instace.get<IUserResponse>(`users/${data.uuid}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setUser(response.data.user);
      setContactsList(response.data.user.contacts);
      navigate("/dashboard");
    } catch (error: any) {
      window.localStorage.clear();
      console.error(error);
      toast.error("Email e/ou Senha incorreto!", {
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setDisable(false);
    }
  };

  const registerUser = async (
    data: IRegister,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void> => {
    try {
      setDisable(true);
      await instace.post("users", data);

      toast.success("Conta criada com sucesso!", {
        autoClose: 3000,
        theme: "dark",
      });
      navigate("/");
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

  const updateUser = async (
    data: IUserUpdate,
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
      const id = window.localStorage.getItem("@KAuuid");
      const token = window.localStorage.getItem("@KAtoken");
      const { data } = await instace.patch(`users/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setModalUpdateUser(false);
    } catch (err) {
      console.error(err);
    } finally {
      setDisable(false);
    }
  };

  const deleteUser = async (
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setDisable(true);
      const token = window.localStorage.getItem("@KAtoken");
      const id = window.localStorage.getItem("@KAuuid");
      await instace.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Conta deletada!", {
        autoClose: 3000,
        theme: "dark",
      });
      setUser(null);
      setModalDeleteUser(false);
      window.localStorage.clear();
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
    <UserContext.Provider
      value={{
        user,
        contactsList,
        isLoading,
        login,
        registerUser,
        navigate,
        setUser,
        setContactsList,
        modalDeleteUser,
        setModalDeleteUser,
        modalUpdateUser,
        setModalUpdateUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
