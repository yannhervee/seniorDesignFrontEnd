import styles from '../styles/ContentDashboard.module.css'
import React from 'react'

const ContentDashboard = () => {
    return (
        <>
        <div className={styles.contentcontainer}>
			<div className={styles.contentwrapper}>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h2>My Courses</h2>
					</div>
				
				</div>
			</div>
            </div>
            
			
			<div className={styles.coursestab}>
					
                    <a className={styles.card}> Course a</a>
                    <a className={styles.card}> Course b</a>
                    <a className={styles.card}> Course c</a>
                    <a className={styles.card}> Course d</a>
                    <a className={styles.card}> Course f</a>
                    <a className={styles.card}> Course a</a>
                    <a className={styles.card}> Course b</a>
                    <a className={styles.card}> Course c</a>
                    <a className={styles.card}> Course d</a>
                    <a className={styles.card}> Course f</a>

			</div>
            </>
		

    )
  }
  
  export default ContentDashboard;