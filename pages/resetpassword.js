
import Image from 'next/image'
import logo from '../public/Translogo.png' 
import styles from '../styles/Register.module.css'

const ResetPassword = () => {

    const resetPassword = async event => {
        event.preventDefault()


    }

    return(
        <>
        <div className={`${styles.split} ${styles.right}`}>
            <div className={styles.centered}>
            <div className={styles.resettitle}>
                <h3 className={styles.title}>Reset Password</h3>
            </div>
           
            <form onSubmit={resetPassword}>
                <div>
                    <label for="email" className={styles.label}>Email *</label>
                    <input type="email" id="email" placeholder="email" className={styles.input} required />
                </div>
                <div>
                    <label for="password" className={styles.label} > New Password *</label>
                    <input type="password" id="password" placeholder="password" className={styles.input} required />
                </div>
                <div>
                    <label for="password" className={styles.label} > Confirm New Password *</label>
                    <input type="password" id="confirmPassword" placeholder="password" className={styles.input} required />
                </div>
              
                <div>
                    <button type="submit" className={styles.button}>Reset Password</button>
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

export default ResetPassword;