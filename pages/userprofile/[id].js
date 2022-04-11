import styles from '../../styles/Profile.module.css'
import { useEffect, useState } from 'react';
import{ faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import withUser from '../../components/withUser';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import { axiosInstance } from "../../utils/auth";


const Profile = () => {
    const router = useRouter()
    const {id} = router.query
    const [user, setUser] = useState([])

    useEffect(() => {
        if (!router.isReady) return
    
        console.log('running effect')
    
        // Promises
        axiosInstance().get(`http://localhost:3001/users/${id}`)
        .then((res) => {
            console.log("User data specific", res)
            setUser(res.data);
           
               
        })
        .catch((e) => {
            console.log('error', e);
        })
    }, [router.isReady, router.query])
    
    return(
        
        <>
       
        
        <div className={styles.header}>
        <div className={styles.back}><Link href="/dashboard"> &larr; back to dashboard </Link></div>
        </div>
        <div className={styles.container}>
            <div className={styles.box1}>
            <FontAwesomeIcon icon={faUser} style={{width:"200px", height:"300px", textAlign:"center", cursor:"pointer", color: "#732e9c"}}/>
            <h4 className={styles.inforole}>Student</h4>
            <h4 className={styles.info}>name: {user.name} </h4>
            <h4 className={styles.info}>email: {user.email} </h4>
            <h4 className={styles.info}>reliability: {user.reliability} </h4>
            </div>  
         
        </div>
        
       
        
        </>
    )
}

export default withUser(Profile);