import styles from '../styles/ContentDashboard.module.css'
import React from 'react'
import { selectUser } from '../features/userSlice'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useEffect, useState } from 'react';

const ContentDashboard = () => {
   // const user = useSelector(selectUser)

    // CRUD - create, read, update, delete
    // REST apis

    // read - index -- /resources        GET     1 or more 
    // read - show -- /resources/resouce_id   GET  only 1
    // create - create -- /resources     POST
    // update - update -- /resources/resource_id  POST

    const [userCourses, setUserCourses] = useState([])


    useEffect(() => {
        console.log('running effect')
      //  console.log(user, 'department')
        // Promises
        axios.get('http://localhost:3001/user_courses/', {
            params: {
                user_id: 12
            }
        })
        .then((res) => {
            console.log(res);  
            setUserCourses(res.data)      
            console.log("res data courses", userCourses)
            console.log("res data courses", userCourses[0].course.name)

        })
        .catch((e) => {
            console.log('error', e);
        })
    })

    const renderCourses = () => {
        return userCourses.map((userCourse) => {
            return <a className={styles.card}>{userCourse.course.name}</a>
        })
    }

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
                {renderCourses()}
					
                   {/*  <a className={styles.card}> Course a</a>
                    <a className={styles.card}> Course b</a>
                    <a className={styles.card}> Course c</a>
                    <a className={styles.card}> Course d</a>
                    <a className={styles.card}> Course f</a>
                    <a className={styles.card}> Course a</a>
                    <a className={styles.card}> Course b</a>
                    <a className={styles.card}> Course c</a>
                    <a className={styles.card}> Course d</a>
                    <a className={styles.card}> Course f</a> */}

			</div>
            </>
		

    )
  }
  
  export default ContentDashboard;