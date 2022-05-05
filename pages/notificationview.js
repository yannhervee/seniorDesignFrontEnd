import LeftNav from "../components/LeftNav";
import styles from "../styles/Notification.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "../utils/auth";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withUser from "../components/withUser";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs().from(dayjs("1990-01-01")); // in 31 years
dayjs().from(dayjs("1990-01-01"), true); // 31 years
dayjs().fromNow();

dayjs().to(dayjs("1990-01-01")); // "31 years ago"
dayjs().toNow();

dayjs.extend(relativeTime);

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("running effect");
    //  console.log(user, 'department')
    // Promises
    axiosInstance()
      .get("/notifications")
      .then((res) => {
        console.log(res);
        setNotifications(res.data);
        console.log("res data posts", res.data[0]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  const handleDismissButton = (notifId, e) => {
    e.preventDefault();
    const editUrl = `/notifications/${notifId}`;

    if (notifId) {
      axiosInstance()
        .put(editUrl)
        .then((res) => {
          console.log("update notif", res);
          setNotifications(
            notifications.filter((notif) => notif.id !== notifId)
          );
        });
    }
  };

  return (
    <>
      <LeftNav />
      <div className={styles.maincontainer}>
        <h1 className={styles.header}>Notifications</h1>

        {notifications
          .slice(0)
          .reverse()
          .map((notification) => {
            return (
              <>
                <Link href={`../forum/${notification.post_id}`}>
                  <div className={styles.question}>
                    <div className={styles.notifbody}>
                      <a className={styles.icon}>
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          style={{ width: "80px", height: "70px" }}
                        />
                      </a>
                      <div className={styles.text}>{notification.body} </div>
                    </div>
                    <div className={styles.others}>
                      <div className={styles.notiftime}>
                        {dayjs(notification.created_at).fromNow()}
                      </div>
                      <button
                        className={styles.dismiss}
                        onClick={(e) => handleDismissButton(notification.id, e)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}

        {/*         <div className={styles.question}>
          <div className={styles.notifbody}>
            <a className={styles.icon}>
              <FontAwesomeIcon
                icon={faNewspaper}
                style={{ width: "80px", height: "70px" }}
              />
            </a>
            <div className={styles.text}>
              body of notification : you have a new nootifcation{" "}
            </div>
          </div>
          <div className={styles.others}>
            <div className={styles.notiftime}>3h</div>
            <button className={styles.dismiss}>Dismiss</button>
          </div>
        </div>
 */}
        {/*  
            {notifications.length > 0 && notifications.map((notification, index) => {
              return <h1 key={index}>{notification.body}</h1>
            })} */}
      </div>
    </>
  );
};

export default withUser(NotificationView);
