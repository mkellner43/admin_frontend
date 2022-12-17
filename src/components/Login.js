import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

const Login = (props) => {
  const navigate = useNavigate()
  const {setToken, error} = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    e.target.name === 'username' ?
      setUsername(e.target.value) 
      :
      setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: e.target.form.username.value,
      password: e.target.form.password.value
    }
    fetch(`http://localhost:3000/admin/login`, {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => { 
      setToken(data)
      if(data._id) {navigate('/')}
    })
    .catch((error) => {
      console.error("Error:", error)
    })
  }
  return (
      <form className='mid-screen'>
        <h1>Log in</h1>
        <input className='mt-1' name='username' type='text' onChange={handleChange} value={username} placeholder="username" />
        <input className='mt-1' name='password' type='password' onChange={handleChange} value={password} placeholder="password" />
        <button className='btn mt-1' type="submit" onClick={handleSubmit}>Login</button>
        <p className='error'>{error}</p>
      </form>
  )
}

export default Login;