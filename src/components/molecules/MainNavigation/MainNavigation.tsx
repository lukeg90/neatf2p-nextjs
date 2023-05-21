import { useRouter } from "next/router"
import { NavUnorderedList, NavListItem, NavLink } from './MainNavigation.styled'

const MainNavigation = () => {
  const { asPath } = useRouter()
  const navigationLinks = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/about',
      text: 'About'
    },
    {
      path: '/how-to-play',
      text: 'How to Play',
    },
    { 
      path: '/hiscores',
      text: 'Hiscores',
    },
    {
      path: '/discord',
      text: 'Discord',
    }, 
    {
      path: '/bug-reports',
      text: 'Bug Reports'
    },
  ]

  return (
    <NavUnorderedList>
      {navigationLinks.map((link: { path: string; text: string; }) => (
        <NavListItem key={link.path}>
          <NavLink href={link.path} isActive={link.path === asPath}>{link.text}</NavLink>
        </NavListItem>
      ))}
    </NavUnorderedList>
  )
}

export default MainNavigation