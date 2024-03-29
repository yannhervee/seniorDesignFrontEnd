import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import logo from "../public/wtransparent.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faRocket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const Nav = ({ count }) => {
  const { user: currentUser } = useSelector((state) => state.user);

  return (
    <div className={navStyles.nav}>
      <div className={navStyles.imagelogo}>
        <Image src={logo} alt="Logo" />
      </div>
      <div>
        <Link href="/dashboard">
          <a className={navStyles.logotilte}>Student connection </a>
        </Link>
      </div>
      <div className={navStyles.right}>
        <ul>
          <li>
            <Link href="/postquestion">
              <button className={navStyles.postquestionbutton}>
                Post a question
              </button>
            </Link>
          </li>
          <li>
            <Link href="/notificationview">
              <FontAwesomeIcon
                icon={faBell}
                style={{ width: "18px", cursor: "pointer" }}
              />
            </Link>
            {count}
          </li>
          <li>
            <Link href="/profile">
              <a>
                {" "}
                {currentUser ? (
                  currentUser.name
                ) : (
                  <Skeleton width="30px" height="14px" />
                )}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <FontAwesomeIcon
                icon={faRocket}
                style={{ width: "18px", cursor: "pointer" }}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
