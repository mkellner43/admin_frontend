import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

const Login = ({setToken}) => {
  const navigate = useNavigate()
  const username = useRef(null)
  const password = useRef(null)
  const [error, setErrors] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: username.current.value,
      password: password.current.value
    }
    fetch(`http://localhost:3000/admin/login`, {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => { 
      if(data.status !== 200) return setErrors(data.msg)
      setToken(data)
      navigate('/')
    })
    .catch((err) => {
      console.error("Error:", err)
      setErrors(err)
    })
  }
  return (
    <form>
      <h1>Log in</h1>
      <input 
        ref={username}
        className='mt-1' 
        data-error={error ? true : false}
        type='text' 
        placeholder="username"
      />
      <input 
        ref={password}
        className='mt-1' 
        data-error={error ? true : false} 
        type='password' 
        placeholder="password" 
      />
      <button 
        className='btn mt-1'
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </button>
      <p className='error mt-1'>{error}</p>
    </form>
  )
}

export default Login;