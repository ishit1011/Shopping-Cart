import './App.css';
import Header from './Header';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Home';
import Cart from './Cart';


function App() {
  return (
    <BrowserRouter>
      <Header/>

        <Route path='/' exact>
          <Home/>
        </Route>

        <Route path='/cart' exact>
          <Cart/>
        </Route>

    </BrowserRouter>
  );
}

export default App;
