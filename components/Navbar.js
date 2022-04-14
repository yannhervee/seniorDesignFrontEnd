import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import logo from '../public/wtransparent.png' 
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faBars, faBell, faRocket} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react"
import { axiosInstance } from '../utils/auth';



const Navbar = ({count}) => {
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    axiosInstance().get('http://localhost:3001/users/fetch_current_user')
    .then((res) => {
        console.log("fecth user name", res.data)
               setCurrentUser(res.data);
               

    })
    .catch(() => {
        //
    })

}, [])
  
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
                <a>Beautiful</a>
                </li>
                <li>
                <Link href='/dashboard'><FontAwesomeIcon icon={faRocket} style={{width:"18px", cursor:"pointer"}}/></Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
