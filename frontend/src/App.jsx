import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import BlogDetail from './components/BlogDetail';
import BlogUpdate from './components/BlogUpdate';
import './App.css';
import BlogCreate from './components/BlogCreate';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Navbar /> */}
      <Toaster />
      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-blog' element={<BlogCreate />} />
          <Route path='/blogs/:id' element={<BlogDetail />} />
          <Route path="/update/:id" element={<BlogUpdate />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}

export default App
