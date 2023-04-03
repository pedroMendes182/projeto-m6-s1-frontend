import RoutesMain from "./routes";
import GlobalStyle from "./styles/global";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GlobalStyle />
      <RoutesMain />
      <ToastContainer />
    </>
  );
}

export default App;
