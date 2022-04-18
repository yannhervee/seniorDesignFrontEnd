import styles from "../styles/LeftNav.module.css";
import Link from "next/link";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUser,
  faCog,
  faRocket,
  faNewspaper,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter}  from "next/router";
import {  axiosInstance, removeDocumentAuthCookies } from "../utils/auth";
import { useDispatch } from "react-redux";
import { register } from "../features/userSlice";

const LeftNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { pathname } =  router;

  const onLogout = () => {
    axiosInstance()
      .delete("/auth/sign_out")
      .then((res) => {
        removeDocumentAuthCookies();
        router.push("/login").then(() => {
          dispatch(register(null));
        });
      })
      .catch();
  };

  return (
    <div className={styles.navcontainer}>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faRocket}
              style={{ width: "18px", cursor: "pointer" }}
            />
            <Link href="/dashboard">
              <a
                className={pathname == "/dashboard" ? styles.active : ""}
              >
                {" "}
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              style={{ width: "18px", cursor: "pointer" }}
            />
            <Link href="/myquestions">
              <a
                className={
                  pathname == "/myquestions" ? styles.active : ""
                }
              >
                {" "}
                My Questions
              </a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faNewspaper}
              style={{ width: "18px", cursor: "pointer" }}
            />
            <Link href="/forum">
              <a className={pathname == "/forum" ? styles.active : ""}>
                {" "}
                Forum
              </a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faUser}
              style={{ width: "18px", cursor: "pointer" }}
            />
            <Link href="/profile">
              <a
                className={pathname == "/settings" ? styles.active : ""}
              >
                {" "}
                My Profile
              </a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ width: "18px", cursor: "pointer" }}
            />
            <button
              onClick={onLogout}
              className={pathname == "/logout" ? styles.active : ""}
            >
              {" "}
              logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNav;
