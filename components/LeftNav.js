import styles from '../styles/LeftNav.module.css'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faChalkboardTeacher, faR, faCog, faRocket, faNewspaper, faSignOutAlt} from "@fortawesome/free-solid-svg-icons"

const LeftNav = () => {
    return (
      <div className={styles.navcontainer}>
            <div className={styles.wrapper}>
                <ul>
                    <li><FontAwesomeIcon icon={faRocket} style={{width:"18px", cursor:"pointer"}}/>
                        <a href="#"> Dashboard</a>
                    </li>
                    <li><FontAwesomeIcon icon={faChalkboardTeacher} style={{width:"18px", cursor:"pointer"}}/>
                        <a href="#"> My Questions</a>
                    </li>
                    <li><FontAwesomeIcon icon={faNewspaper} style={{width:"18px", cursor:"pointer"}}/>
                        <a href="#"> Forum</a>
                    </li>
                    <li><FontAwesomeIcon icon={faCog} style={{width:"18px", cursor:"pointer"}}/>
                        <a href="#"> Settings</a>
                    </li>
                    <li><FontAwesomeIcon icon={faSignOutAlt} style={{width:"18px", cursor:"pointer"}}/>
                        <a href="#"> Logout</a>
                    </li>
                </ul>

            </div>
      </div>
    )
  }
  
  export default LeftNav;