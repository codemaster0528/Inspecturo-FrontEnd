// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Global
import { SERVER_URL } from '../globalValues'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  const { settings, saveSettings } = useSettings()

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(SERVER_URL + authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(SERVER_URL + authConfig.loginEndpoint, params)
      .then(async res => {
        console.log(res.data.userRegionIds)
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
        window.localStorage.setItem(authConfig.storageUserEmail, res.data.userEmail)
        window.localStorage.setItem(authConfig.storageUserName, res.data.userName)
        window.localStorage.setItem(authConfig.storageUserRegionIds, JSON.stringify(res.data.userRegionIds))
        window.localStorage.setItem(authConfig.storageUserRegionTexts, JSON.stringify(res.data.userRegionTexts))
        window.localStorage.setItem(authConfig.storageUserStatus, res.data.userStatus)
        window.localStorage.setItem(authConfig.storageUserAddons, res.data.userAddons)
      })
      .then(() => {
        axios
          .get(SERVER_URL + authConfig.meEndpoint, {
            headers: {
              Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({ ...response.data.userData })
            await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            console.log('redirect url : ' + redirectURL)
            router.replace(redirectURL)
          })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err.response.data)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
