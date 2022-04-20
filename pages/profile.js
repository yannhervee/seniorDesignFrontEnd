import styles from "../styles/Profile.module.css";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import withUser from "../components/withUser";
import { useSelector, useDispatch } from "react-redux";

import { axiosInstance } from "../utils/auth";

const Profile = () => {
    
 const { user: currentUser } = useSelector((state) => state.user)

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
          <h4 className={styles.inforole}>{currentUser.role}</h4>
          <h4 className={styles.info}>name: {currentUser.name} </h4>
          <h4 className={styles.info}>email: {currentUser.email} </h4>
          {currentUser.role.localeCompare("student") === 0 ? (<h4 className={styles.info}>
            reputation: {currentUser.reliability}{" "}
          </h4>) : null}
         
        </div>
      </div>
    </>
  );
};

export default withUser(Profile);
