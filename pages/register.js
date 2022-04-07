import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image'
import logo from '../public/Translogo.png' 
import styles from '../styles/Register.module.css'
import { register } from "../features/userSlice"
import { axiosInstance, setAuthInfo } from '../utils/auth';

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch() 
 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState()

    // redux, reduxjs-toolkit

    // Save user id in cookie
    // Send cookie to backend (security)
    // Validate cookie on backend

    const registerUser = async e => {
        e.preventDefault()

         axiosInstance().post('http://localhost:3001/auth', {            
                name: name,
                email: email,
                password: password, 
                password_confirmation: confirmPassword,
                role: role,
                reliability: 0
        })
        .then((res) => {
            console.log("resdata", res);
            console.log("registerpage" , res.data.data.id) ; 
            console.log("registerpage" , res.data.data.email) ; 
            console.log("registerpage" , res.data.data.name) ; 
            setAuthInfo(res.headers)
            dispatch(register(res.data.data)) 
            router.push('/departments');
        })
        .catch((e) => {
            // TODO: handle user with accounts
            // TODO: validations
            console.log('error', e);
        })  

/*          const data = {
            name,
            email,
            password,
            role,
          };
          console.log(data); */
 
    } 

    return(
        <>
        <div className={`${styles.split} ${styles.right}`}>
            <div className={styles.centered}>
            <h1 className={styles.title}>SIGN UP</h1>
            <form onSubmit={registerUser}>
                <div>
                    <label for="name" className={styles.label}>Full Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="first, last name" 
                        onChange={e => setName(e.target.value)}
                        className={styles.input} 
                        required 
                    />
                </div>
                <div>
                    <label for="email" className={styles.label}>Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="email" 
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input} 
                        required 
                    />
                </div>
                <div>
                    <label for="password" className={styles.label} >Password *</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="password" 
                        onChange={e => setPassword(e.target.value)}
                        className={styles.input} 
                        required 
                    />
                </div>
                <div>
                    <label for="confirmpassword" className={styles.label} >Confirm Password *</label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        placeholder="retype password" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        className={styles.input}
                        required 
                    />
                </div>
                <div>
                    <label for="role" className={styles.label}>I am a </label>
                    <select id="role" 
                        className={styles.input} 
                        onChange={e => setRole(e.target.value)}
                        required
                        >
                        <option value="" disabled selected>Select your option</option>
                        <option value="student">student</option>
                        <option value="professor">professor</option>    
                    </select>
                </div>
                <div>
                    <label for="terms">
                        <input id="terms" type="checkbox" required />
                        I agree to the terms and privacy policy.
                    </label>
                </div>
                <div>
                    <button type="submit" className={styles.button}>Register</button>
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

export default Register;