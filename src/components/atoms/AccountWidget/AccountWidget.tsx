import { AccountArea, Username, AccountAreaLink } from './AccountWidget.styled'
import { Typography } from '@mui/material'
import axios from 'axios'
import { User } from '@globalTypes/User'

interface AccountWidgetProps {
  user: User
}

const AccountWidget = (props: AccountWidgetProps) => {
  const { user } = props
  const isLoggedIn = user?.id > 0

  const handleLogout = () => {
    axios
      .get('/api/ironLogout')
      .then(() => {
        const win: Window = window
        win.location = '/'
      })
      .catch((error: string) => {
        console.log('An error occurred on logout: ', error)
      })
  }

  return (
    <AccountArea>
      {isLoggedIn && (
        <>
          <Typography variant='body'>
            Hi <Username href='/account'>{user.username}</Username>!
          </Typography>
          ~
        </>
      )}
      {!isLoggedIn && (
        <>
          <AccountAreaLink href='/account/login'>Login</AccountAreaLink>~
          <AccountAreaLink href='/account/create'>Register</AccountAreaLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <AccountAreaLink href='' onClick={handleLogout}>
            Logout
          </AccountAreaLink>
        </>
      )}
    </AccountArea>
  )
}

export default AccountWidget
