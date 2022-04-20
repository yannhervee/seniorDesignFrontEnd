import styles from '../styles/Header.module.css'
import React from 'react'
import { useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";

const Header = () => {
    const { user: currentUser } = useSelector((state) => state.user)
    return (
        <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
            <div className={styles.title}>
                <h2>
                    Hello, <span>{currentUser ? currentUser.name : <Skeleton width="30px" height="14px" />}</span>
                </h2>
                <p>welcome to student connection.</p>
            </div>
        </div>
    </div>

    )
  }
  
  export default Header;