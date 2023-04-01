import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { To, useNavigate } from "react-router-dom";
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
  contactsList: IContact[] | null;
  isLoading: boolean;
  login(
    dataReq: ILogin,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  registerUser(
    data: IRegister,
    setDisable: React.Dispatch<SetStateAction<boolean>>
  ): Promise<void>;
  navigate: IUseNavigate;
}

export const UserContext = createContext<IUserProvider>({} as IUserProvider);

const UserProvider = ({ children }: IProvidersProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [contactsList, setContactsList] = useState<IContact[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (error) {
      window.localStorage.clear();

      console.log(error);
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

      navigate("/");
    } catch (error: any) {
      console.error(error);
    } finally {
      setDisable(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, contactsList, isLoading, login, registerUser, navigate }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
