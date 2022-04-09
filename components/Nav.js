import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import logo from '../public/wtransparent.png' 
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faBars, faBell} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react"
import { axiosInstance } from '../utils/auth';


const Nav = ({count}) => {
  
  return (
    <div className={navStyles.nav}>
        <div className={navStyles.imagelogo}>
            <Image 
            src={logo}
            alt="Logo"
            />
        </div>
        <div>
          <a className={navStyles.logotilte}>Student connection </a>
        </div>
        <div className={navStyles.right}>
            <ul>
                <li>
                  <Link href='/postquestion'><button className={navStyles.postquestionbutton}>Post a question</button></Link>
                  
                </li>
                <li>
                <Link href='/notificationview'><FontAwesomeIcon icon={faBell} style={{width:"18px", cursor:"pointer"}}/></Link>{count}
                </li>
                <li>
                <Link href='/about'> Beautiful</Link>
                </li>
                <li>
                <Link href='/dashboard'><FontAwesomeIcon icon={faBars} style={{width:"18px", cursor:"pointer"}}/></Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav

