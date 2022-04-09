import styles from '../styles/Profile.module.css'

import{ faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import withUser from '../components/withUser';

const Profile = () => {

    
    return(
        <>
       
        
        <div className={styles.header}>
        <div className={styles.back}><Link href="/dashboard"> &larr; back to dashboard </Link></div>
        </div>
        <div className={styles.container}>
            <div className={styles.box1}>
            <FontAwesomeIcon icon={faUser} style={{width:"200px", height:"300px", textAlign:"center", cursor:"pointer", color: "#732e9c"}}/>
            <h4 className={styles.info}>Student</h4>
            <h4 className={styles.info}>name</h4>
            <h4 className={styles.info}>email</h4>
            <h4 className={styles.info}>reliability</h4>
            </div>  
         
        </div>
        
       
        
        </>
    )
}

export default withUser(Profile);