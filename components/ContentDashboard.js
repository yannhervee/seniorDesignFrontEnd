import styles from "../styles/ContentDashboard.module.css";
import React from "react";
import { selectUser } from "../features/userSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "../utils/auth";
import withUser from "./withUser";

const ContentDashboard = () => {
    const router = useRouter()
  // const user = useSelector(selectUser)

  // CRUD - create, read, update, delete
  // REST apis

  // read - index -- /resources        GET     1 or more
  // read - show -- /resources/resouce_id   GET  only 1
  // create - create -- /resources     POST
  // update - update -- /resources/resource_id  POST

  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    console.log("running effect");
    //  console.log(user, 'department')
    // Promises
    axiosInstance()
      .get("/user_courses/")
      .then((res) => {
        console.log("responaw", res.data);
        setUserCourses(res.data);
        console.log("res data courses", userCourses);
        console.log("res data name", userCourses[0].course.name);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  const handleRemoveButton = (user_course, e) => {
    e.preventDefault();
    const deleteUrl = `/user_courses/${user_course}`;

    console.log("delete id");
    if (user_course) {
      axiosInstance().delete(deleteUrl).then(() => {
        setUserCourses(
          userCourses.filter((course) => course.id !== user_course)
        );
      });
    }
  };

const handleAddButton = () => {
    router.push('/departments');
}


  const renderCourses = () => {
    return userCourses.map((userCourse) => {
      return (
        <>
          <div className={styles.cardwrapper}>
           <Link href={`course/${userCourse.course.id}`}><div className={styles.card}>
              <a className={styles.name}>{userCourse.course.name}</a>
              <button
                className={styles.button}
                onClick={(e) => handleRemoveButton(userCourse.id, e)}
              >
                {" "}
                Remove Course
              </button>
            </div>
            </Link> 
          </div>
        </>
      );
    });
  };

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

        <button className={styles.add} onClick={handleAddButton}> Add Courses</button>
      </div>
    </>
  );
};

export default ContentDashboard;
