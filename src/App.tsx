import RoutesMain from "./routes";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "./styles/global";
import "react-toastify/dist/ReactToastify.min.css";

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
