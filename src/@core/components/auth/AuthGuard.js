// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { WindowShutter } from 'mdi-material-ui'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady && !router.asPath.includes('reset-password')) {
        return
      }
      if (router.asPath.includes('reset-password')) {
        var url = router.asPath
        url = url.split('=')

        const resetToken = url[url.length - 1]

        window.localStorage.setItem('storageResetToken', resetToken)
        router.replace('/reset-password/')
      } else if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (!router.asPath.includes('reset-password')) {
    if (auth.loading || auth.user === null) {
      return fallback
    }
  }

  return <>{children}</>
}

export default AuthGuard
