import styles from '../styles/LeftNav.module.css'
import Link from 'next/link'
import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faChalkboardTeacher, faR, faCog, faRocket, faNewspaper, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {  useRouter } from 'next/router'

const LeftNav = () => {
    const router = useRouter();
    return (
      <div className={styles.navcontainer}>
            <div className={styles.wrapper}>
                <ul>
                    <li><FontAwesomeIcon icon={faRocket} style={{width:"18px", cursor:"pointer"}}/>
                        <Link href="/dashboard"> 
                        <a className={router.pathname== "/dashboard" ? styles.active : ""}> Dashboard</a>
                        </Link>
                    </li>
                    <li><FontAwesomeIcon icon={faChalkboardTeacher} style={{width:"18px", cursor:"pointer"}}/>
                        <Link href="/myquestions"> 
                        <a className={router.pathname== "/myquestions" ? styles.active : ""}> My Questions</a>
                        </Link>
                    </li>
                    <li><FontAwesomeIcon icon={faNewspaper} style={{width:"18px", cursor:"pointer"}}/>
                        <Link href="/forum">
                        <a className={router.pathname== "/forum" ? styles.active : ""}> Forum</a>
                        </Link>
                    </li>
                    <li><FontAwesomeIcon icon={faCog} style={{width:"18px", cursor:"pointer"}}/>
                        <Link href="/setting"> 
                        <a className={router.pathname== "/settings" ? styles.active : ""}> Settings</a>
                        </Link>
                    </li>
                    <li><FontAwesomeIcon icon={faSignOutAlt} style={{width:"18px", cursor:"pointer"}}/>
                        <Link href="/logout">
                        <a className={router.pathname== "/logout" ? styles.active : ""}> logout</a>
                        </Link>
                    </li>
                </ul>

            </div>
      </div>
    )
  }
  
  export default LeftNav;