import styles from '../styles/Header.module.css'
import React from 'react'

const Header = () => {
    return (
        <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
            <div className={styles.title}>
                <h2>
                    Hello, <span>Beautiful</span>
                </h2>
                <p>welcome to student connection.</p>
            </div>
        </div>
    </div>

    )
  }
  
  export default Header;