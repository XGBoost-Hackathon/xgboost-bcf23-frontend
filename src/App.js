import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './contents/navbar';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
