import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../public/Translogo.png' 
import styles from '../styles/Register.module.css'
import withUser from '../components/withUser';
import { axiosInstance, setAuthInfo } from '../utils/auth';
import { register } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async event => {
        event.preventDefault()

        axiosInstance().post('http://localhost:3001/auth/sign_in', {            
            email: email,
            password: password            
        })
        .then((res) => {
            console.log("resdata", res);           
            setAuthInfo(res.headers)
            dispatch(register(res.data.data)) 
            router.push('/dashboard');
        })
        .catch((e) => {
            // TODO: handle user with accounts
            // TODO: validations
            console.log('error', e);
        })  


    }

    return(
        <>
        <div className={`${styles.split} ${styles.right}`}>
            <div className={styles.centered}>
            <h1 className={styles.title}>LOGIN</h1>
            <form onSubmit={loginUser}>
                <div>
                    <label for="email" className={styles.label}>Email *</label>
                    <input type="email" id="email" placeholder="email" className={styles.input} required onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label for="password" className={styles.label} >Password *</label>
                    <input type="password" id="password" placeholder="password" className={styles.input} required  onChange={e => setPassword(e.target.value)}/>
                </div>
              
                <div>
                    <button type="submit" className={styles.button}>Login</button>
                </div>
            </form>
            <p className={styles.signuplink}>Don't have an account? <a className={styles.linkitem}><Link href="/register">Sign up</Link></a></p>
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


export default withUser(Login);