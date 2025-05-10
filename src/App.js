import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getproducts from './components/Getproduct';
import Makepayment from './components/Makepayments';
import Navbar from './components/Navbar';
import Aboutus from './components/Aboutus';
import ChatBot from './components/Chat';
import Cart from './components/Cart';

import "@fortawesome/fontawesome-free/css/all.min.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/chat'element={<ChatBot/>}/>
          <Route path='/cart'element={<Cart/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
