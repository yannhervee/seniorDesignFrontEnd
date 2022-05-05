import styles from "../../styles/Profile.module.css";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import withUser from "../../components/withUser";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { axiosInstance } from "../../utils/auth";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!router.isReady) return;

    console.log("running effect");

    // Promises
    axiosInstance()
      .get(`/users/${id}`)
      .then((res) => {
        console.log("User data specific", res);
        setUser(res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [router.isReady, router.query]);

  const getReputationClassName = () => {
    // console.log("in report", user);
    if (user) {
      return user.role.localeCompare("student") === 0
        ? styles.info
        : styles.disablereputation;
    }
    //return currentUser.id === commenter ?  styles.disablebutton : styles.buttonlike
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.back}>
          {" "}
          {/* <Link href="/myquestions"> &larr; back </Link> */}
          <button className={styles.backbutton} onClick={() => router.back()}>
            {" "}
            &larr; back{" "}
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box1}>
          {user.thumbnail_url ? (
            <img src={user.thumbnail_url} width="300" height="250" />
          ) : (
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
          )}

          <h4 className={styles.inforole}>{user.role}</h4>
          <h4 className={styles.info}>name: {user.name} </h4>
          <h4 className={styles.info}>email: {user.email} </h4>
        </div>
      </div>
    </>
  );
};

export default withUser(Profile);
