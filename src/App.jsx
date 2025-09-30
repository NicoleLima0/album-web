import { BrowserRouter } from "react-router-dom";
import { baseroot } from "./constants/defaultValues";
import Routers from "./router";
import { ToastContainer } from "react-toastify";

function App(props) {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename={baseroot}>
        <Routers {...props} />
      </BrowserRouter>
    </>
  );
}

export default App;
