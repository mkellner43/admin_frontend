import { useState } from "react";

const useToken = () => {

  const getToken = () => {
    const rawToken = sessionStorage.getItem('token')
    const token = JSON.parse(rawToken)
    return token?.token
  }
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;