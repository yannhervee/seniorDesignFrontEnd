import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Departments.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {  chooseCourses } from "../features/userCourseSlice"
import { removeListener } from '@reduxjs/toolkit';
import { selectUser } from '../features/userSlice';
import { axiosInstance } from '../utils/auth';

// useEffect, useCallback, useState, useRef, useMemo
const Courses = () => {
    const [selectedCourses, setSelectedCourses] = useState({})
    const [courses, setCourses] = useState([])
    //const dispatch = useDispatch() 
    const user = useSelector(selectUser)
    console.log("course state redux", user)

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return

        console.log('running effect')

        // Promises
        axiosInstance().get('http://localhost:3001/courses', {
            params: {
                departments: router.query.departments.split(',')
            }
        })
        .then((res) => {
            console.log("data courses", res)
            setCourses(res.data);        
        })
        .catch((e) => {
            console.log('error', e);
        })
    }, [router.isReady, router.query])

    const onCourseClick = (course) => {
        setSelectedCourses((state) => {
            const newState = { ...state };
            if (newState[course.id]) {
                delete newState[course.id]
            } else {
                newState[course.id] = true
            }
            return newState
        })
    }

    const getCourseClassName = (course) => {
        const borderClass = styles.bordercard
        return selectedCourses[course.id] ? `${styles.card} ${borderClass}` : styles.card
    }


    const renderCourses = () => {
        return courses.map((course) => {
            return <a 
                        key={course.id}
                        className={getCourseClassName(course)}
                        onClick={() => {onCourseClick(course) }}
                    >
                        {course.name}
                        </a>
        })
    }

    const handleButton = (e) => {
        e.preventDefault();
        console.log("selectcourses", selectedCourses)
        console.log("selectcourses keys", Object.keys(selectedCourses))

        
        
         axios.post('http://localhost:3001/user_courses', {
            
                user_id: 12, // todo user.id, todo
                courses_id: Object.keys(selectedCourses)

            
        })
        .then((res) => {
            console.log("res for courses submition", res)       
        })
        .catch((e) => {
            console.log('error', e);
        }) 

        router.push('/dashboard')
        return;
    }

    

    return (
        <>
            <div>
                <h1 className={styles.title}>Which courses are you interested in?</h1>
                <div>{renderCourses()}</div>
                <div className={styles.butcontainer}>
                    <button className={styles.buttonCourse} onClick={handleButton}> Complete registration</button>
                </div>
             </div>
            </>    
    )
}

export default Courses;