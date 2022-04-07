import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import logo from '../public/Translogo.png' 

const Home = () => {
  return (
    <div className={styles.page1}>
      <div className={`${styles.split} ${styles.right}`}>
        <h1 className={styles.welcomeText}>Welcome</h1>
        <div>
          <p className={styles.hook}>
            Are you interested in helping your schools friend with their homework 
            or getting help from them?
          </p>
          </div>
          <div className={styles.butcontainer}>
            <Link href='/register'><span className={styles.button}> Get started</span></Link>
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

    </div>
  )
}


export default Home;