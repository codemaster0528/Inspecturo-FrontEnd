// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import FormHelperText from '@mui/material/FormHelperText'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const ResetPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(0)
  }
}))

const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '100%'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%'
  }
}))

const Logo = styled('img')(({ theme }) => ({
  maxWidth: '15rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '11rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '7rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ResetPasswordV2 = () => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()
  const [reseted, setReseted] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const onHandleResetPassword = () => {
    if (values.newPassword != values.confirmNewPassword) {
      setError('Password does not match')

      return
    }
    console.log(values.newPassword)
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var urlencoded = new URLSearchParams()
    urlencoded.append('newPassword', values.newPassword)
    urlencoded.append('resetToken', window.localStorage.getItem('storageResetToken'))

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    fetch('http://localhost:9118/resetPassword', requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result != 'Invalid Reset Link') {
          setError(
            'Your password has been successfully reset and you will be redirect back to the Login page in 5 seconds'
          )

          setTimeout(() => {
            router.replace('/login')
          }, '5000')
        } else {
          setError('Permission Error!')
        }
      })
      .catch(error => console.log('error', error))
  }

  const imageSource =
    skin === 'bordered' ? 'auth-v2-reset-password-illustration-bordered' : 'auth-v2-reset-password-illustration'
  const logoSource = 'inspecturo-turo-owner-software-logo'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div
            style={{
              background: `url(/images/pages/${imageSource}-${theme.palette.mode}.png)`,
              bakcgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%',
              height: '100vh'
            }}
          ></div>
          {/* <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper> */}
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Link passHref href='http://inspecturo.com'>
                <Logo alt='login-title' src={`/images/pages/${logoSource}-${theme.palette.mode}.png`} />
              </Link>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Password Reset 🔒</TypographyStyled>
              <Typography variant='body2'>Enter your new password below </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-reset-password-v2-new-password'>Enter Your New Password</InputLabel>
                <OutlinedInput
                  autoFocus
                  label='Enter Your New Password'
                  value={values.newPassword}
                  id='auth-reset-password-v2-new-password'
                  onChange={handleNewPasswordChange('newPassword')}
                  type={values.showNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowNewPassword}
                        aria-label='toggle password visibility'
                        onMouseDown={handleMouseDownNewPassword}
                      >
                        {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-reset-password-v2-confirm-password'>Enter Your New Password Again</InputLabel>
                <OutlinedInput
                  label='Enter Your New Password Again'
                  value={values.confirmNewPassword}
                  id='auth-reset-password-v2-confirm-password'
                  type={values.showConfirmNewPassword ? 'text' : 'password'}
                  onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownConfirmNewPassword}
                      >
                        {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormHelperText sx={{ ml: 2, color: 'error.main' }} id=''>
                {error}
              </FormHelperText>

              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 5.25, mt: 3 }}
                onClick={() => onHandleResetPassword()}
              >
                RESET YOUR PASSWORD
              </Button>
              <Typography component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link passHref href='/login'>
                  <Typography
                    component={MuiLink}
                    sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                  >
                    <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                    <span>Back to login</span>
                  </Typography>
                </Link>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ResetPasswordV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordV2
