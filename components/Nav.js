
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import logo from '../public/wtransparent.png' 
import Image from 'next/image'

const Nav = () => {
  return (
    <div className={navStyles.nav}>
        <div className={navStyles.imagelogo}>
            <Image 
            src={logo}
            alt="Logo"
            />
        </div>
        <div>
          <a>Student connection </a>
        </div>
        <div className={navStyles.right}>
            <ul>
                <li>
                <Link href='/'>Home</Link>
                </li>
                <li>
                <Link href='/about'>About</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav

