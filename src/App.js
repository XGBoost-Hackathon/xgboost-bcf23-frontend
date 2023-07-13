import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/loginpage';
import { useRef } from 'react';
import Chatdorm from './pages/chatdorm';
import Chatroom from './pages/chatroom';

function App() {
  const socketRef = useRef(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Loginpage socketRef={socketRef}/>}/>
        <Route path='/chat' element={<Chatdorm socketRef={socketRef}/>}/>
        <Route path='/privatechat/:otherperson' element={<Chatroom socketRef={socketRef}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
