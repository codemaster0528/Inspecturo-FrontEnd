import { useAuth } from 'src/hooks/useAuth'
import React, { useEffect } from 'react'

const LogOut = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  })

  return <div></div>
}

export default LogOut
