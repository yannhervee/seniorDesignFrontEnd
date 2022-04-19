import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import { axiosInstance } from "../utils/auth";
import { useCallback, useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [count, setCount] = useState(0);

  const [interval, storeInterval] = useState();

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
  }, [])

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    storeInterval(
      setInterval(() => {
       getNotifications()
      }, 30000)
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

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
