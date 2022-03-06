import styles from '../styles/ContentDashboard.module.css'
import React from 'react'

const ContentDashboard = () => {
    return (
        <div className={styles.contentcontainer}>
			<div className={styles.contentwrapper}>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h2>My Courses</h2>
					</div>
				
				</div>
			</div>
			{/* display courses  */}
			<div className={styles.coursestab}>
				<div className={styles.bar}>
					<h2>list of courses</h2>
				</div>
			</div>
		</div>

    )
  }
  
  export default ContentDashboard;