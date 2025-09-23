import { BrowserRouter } from 'react-router-dom';
import { baseroot } from './constants/defaultValues';
import Routers from './router';

function App(props) {
  return (
    <>
      <BrowserRouter basename={baseroot}>
        <Routers {...props} />
      </BrowserRouter>
    </>
  );
}

export default App;
