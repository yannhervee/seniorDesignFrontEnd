import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../public/Translogo.png' 
import styles from '../styles/Register.module.css'

const Login = () => {

    const loginUser = async event => {
        event.preventDefault()


    }

    return(
        <>
        <div className={`${styles.split} ${styles.right}`}>
            <div className={styles.centered}>
            <h1 className={styles.title}>LOGIN</h1>
            <form onSubmit={loginUser}>
                <div>
                    <label for="email" className={styles.label}>Email *</label>
                    <input type="email" id="email" placeholder="email" className={styles.input} required />
                </div>
                <div>
                    <label for="password" className={styles.label} >Password *</label>
                    <input type="password" id="password" placeholder="password" className={styles.input} required />
                </div>
              
                <div>
                    <button type="submit" className={styles.button}>Login</button>
                </div>
            </form>
            </div>
        </div>
        <div className={`${styles.split} ${styles.left}`}>
            <div className={styles.imagelogo}>
                <Image
                    src={logo}
                    alt="Logo"
                />
            </div>

        </div>
            
        </>
    )
}

export default Login;