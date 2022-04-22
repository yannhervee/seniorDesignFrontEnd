import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import { axiosInstance } from "../utils/auth";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [count, setCount] = useState(0);

  const [interval, storeInterval] = useState();
  const { user: currentUser } = useSelector((state) => state.user);

  const getNotifications = useCallback(() => {
    axiosInstance()
      .get(`/unread_notifications`)
      .then((res) => {
        console.log("check notification", res.data);
        setCount(res.data.length);
      })
      .catch(() => {
        //
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getNotifications();
    }
  }, [currentUser, getNotifications]);

  useEffect(() => {
    storeInterval(
      setInterval(() => {
        if (currentUser) {
          getNotifications();
        }
      }, 30000)
    );
    return () => {
      clearInterval(interval);
    };
  }, [currentUser, getNotifications]);

  return (
    <>
      <Nav count={count} />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
