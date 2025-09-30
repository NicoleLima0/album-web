import { BrowserRouter } from "react-router-dom";
import Routers from "./router";
import { ToastContainer } from "react-toastify";

function App(props) {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename="/album-web">
        <Routers {...props} />
      </BrowserRouter>
    </>
  );
}

export default App;
