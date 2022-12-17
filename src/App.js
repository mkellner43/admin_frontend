import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import useToken from './useToken';
import NewBlog from './components/NewBlog';
import ShowBlog from './components/ShowBlog';
import EditBlog from './components/EditBlog';
function App() {
  let {token, setToken} = useToken();
  if(!token || token?.msg) {
    const errorMsg = token ? token?.msg : ''
    return <Login setToken={setToken} error={errorMsg}/> //make this prettier - Navigate with conditionals
  }
  return (
    <>
    <Nav setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login setToken={setToken}/>} />
        <Route path='/blog/create' element={<NewBlog />} />
        <Route path='/blog/edit/:id' element={<EditBlog />}/>
        <Route path='/blog/:id' element={<ShowBlog />} />
      </Routes>
    </>
  );
}

export default App;