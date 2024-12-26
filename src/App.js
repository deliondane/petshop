import {Routes, Route} from 'react-router-dom'
import './App.scss';
import Nav from './componenets/Nav';
import Footer from './componenets/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';



function App() {
  return (
    <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
