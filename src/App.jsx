import { HashRouter } from "react-router-dom";
import { baseroot } from "./constants/defaultValues";
import Routers from "./router";
import { ToastContainer } from "react-toastify";

function App(props) {
  return (
    <>
      <ToastContainer />
      <HashRouter basename={baseroot}>
        <Routers {...props} />
      </HashRouter>
    </>
  );
}

export default App;
