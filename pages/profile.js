import styles from "../styles/Profile.module.css";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import withUser from "../components/withUser";
import { useSelector, useDispatch } from "react-redux";

import { axiosInstance } from "../utils/auth";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    axiosInstance()
      .get("/users/fetch_current_user")
      .then((res) => {
        console.log("fecth user profile", res.data);
        setCurrentUser(res.data);
      })
      .catch(() => {
        //
      });
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.back}>
          <Link href="/dashboard"> &larr; back to dashboard </Link>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box1}>
          <FontAwesomeIcon
            icon={faUser}
            style={{
              width: "200px",
              height: "300px",
              textAlign: "center",
              cursor: "pointer",
              color: "#732e9c",
            }}
          />
          <h4 className={styles.inforole}>Student</h4>
          <h4 className={styles.info}>name: {currentUser.name} </h4>
          <h4 className={styles.info}>email: {currentUser.email} </h4>
          <h4 className={styles.info}>
            reliability: {currentUser.reliability}{" "}
          </h4>
        </div>
      </div>
    </>
  );
};

export default withUser(Profile);
